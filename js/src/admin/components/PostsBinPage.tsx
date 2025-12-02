import Page, { IPageAttrs } from 'flarum/common/components/Page';
import Mithril from 'mithril';
import app from 'flarum/admin/app';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import type User from 'flarum/common/models/User';
import Discussion from 'flarum/common/models/Discussion';
import Post from 'flarum/common/models/Post';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';
import extractText from 'flarum/common/utils/extractText';
import { debounce } from 'flarum/common/utils/throttleDebounce';
import humanTime from 'flarum/common/helpers/humanTime';
import Stream from 'flarum/common/utils/Stream';
import RestorePostModal from './RestorePostModal';
import DeletePostModal from './DeletePostModal';
import MassRestorePostModal from './MassRestorePostModal';
import MassDeletePostModal from './MassDeletePostModal';
import { truncate } from 'flarum/common/utils/string';

type ColumnData = {
  /**
   * Column title
   */
  name: Mithril.Children;
  /**
   * Component(s) to show for this column.
   */
  content: (post: Post) => Mithril.Children;
};

/**
 * Admin page which displays a paginated list of all hidden posts on the forum.
 */
export default class PostsBinPage extends Page {
  private query: string = '';
  private throttledSearch = debounce(250, () => this.loadPage(0));
  private postRestored: Stream<boolean> = Stream(false);
  private postDeleted: Stream<boolean> = Stream(false);
  private hiddenPostsCount: Stream<number> = Stream(0);

  /**
   * Number of discussions to load per page.
   */
  private numPerPage: number = 25;

  /**
   * Current page number. Zero-indexed.
   */
  private pageNumber: number = 0;

  /**
   * Page number being loaded. Zero-indexed.
   */
  private loadingPageNumber: number = 0;

  /**
   * Get total number of hidden discussion pages.
   */
  private getTotalPageCount(): number {
    const count = this.hiddenPostsCount();
    if (count === -1 || isNaN(count)) return 0;

    return Math.ceil(count / this.numPerPage);
  }

  /**
   * This page's array of discussions.
   *
   * `undefined` when page loads as no data has been fetched.
   */
  private pageData: Post[] | undefined = undefined;

  /**
   * Are there more hidden discussions available?
   */
  private moreData: boolean = false;

  private isLoadingPage: boolean = false;

  /**
   * Tracking which discussions have been selected for mass actions.
   */
  private selectedPosts: Set<string> = new Set();

  private togglePostSelection(e: Event, postId: string) {
    const checkbox = e.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedPosts.add(postId);
    } else {
      this.selectedPosts.delete(postId);
    }
    m.redraw();
  }

  oninit(vnode: Mithril.Vnode<IPageAttrs, this>) {
    super.oninit(vnode);

    m.request({
      method: 'GET',
      url: '/api/recycle-bin/post-statistics',
    })
      .then((result: unknown) => {
        const typedResult = result as { hidden_posts_count: number };
        this.hiddenPostsCount(typedResult.hidden_posts_count);
      })
      .catch((error: any) => {
        console.error(error);
      });

    // Get page query value from URL
    const page = parseInt(m.route.param('page'));

    if (isNaN(page) || page < 1) {
      this.setPageNumberInUrl(1);
      this.pageNumber = 0;
    } else {
      this.pageNumber = page - 1;
    }

    this.loadingPageNumber = this.pageNumber;

    this.postRestored.map((restored: any) => {
      if (restored) {
        this.loadPage(this.pageNumber);
        this.hiddenPostsCount(this.hiddenPostsCount() - 1);
        this.postRestored(false); // Reset the Stream
      }
    });
    this.postDeleted.map((deleted: any) => {
      if (deleted) {
        this.loadPage(this.pageNumber);
        this.hiddenPostsCount(this.hiddenPostsCount() - 1);
        this.postDeleted(false); // Reset the Stream
      }
    });
  }
  /**
   * Component to render.
   */
  view(vnode: Mithril.Vnode<IPageAttrs, this>): Mithril.Children {
    if (typeof this.pageData === 'undefined') {
      this.loadPage(this.pageNumber);

      return (
        <div className="extensionPage-settings">
          <div className="container">
            <section className="RecycleBinPage-grid RecycleBinPage-grid--loading">
              {m(LoadingIndicator, { containerClassName: 'LoadingIndicator--block', size: 'large' })}
            </section>
          </div>
        </div>
      );
    }

    const columns = this.columns().toArray();

    return (
      <div className="ExtensionPage-settings">
        <h2>{app.translator.trans('walsgit-recycle-bin.admin.posts_bin')}</h2>
        <div className="RecycleBinPage-header">{this.headerItems().toArray()}</div>
        <section
          className={classList(['RecycleBinPage-grid', this.isLoadingPage ? 'RecycleBinPage-grid--loadingPage' : 'RecycleBinPage-grid--loaded'])}
          style={{ '--columns': columns.length }}
          role="table"
          aria-rowcount={this.pageData.length + 1}
          aria-colcount={columns.length}
          aria-live="polite"
          aria-busy={this.isLoadingPage ? 'true' : 'false'}
        >
          {columns.map((column, colIndex) => (
            <div className="RecycleBinPage-grid-header" role="columnheader" aria-colindex={colIndex + 1} aria-rowindex={1}>
              {column.name}
            </div>
          ))}

          {this.pageData.map((post, rowIndex) =>
            columns.map((col, colIndex) => {
              const columnContent = col.content && col.content(post);

              return (
                <div
                  className={classList(['RecycleBinPage-grid-rowItem', rowIndex % 2 > 0 && 'RecycleBinPage-grid-rowItem--shaded'])}
                  data-post-id={post.id()}
                  data-column-name={col.itemName}
                  aria-colindex={colIndex + 1}
                  aria-rowindex={rowIndex + 2}
                  role="cell"
                >
                  {columnContent || app.translator.trans('walsgit-recycle-bin.admin.grid.invalid_column_content')}
                </div>
              );
            })
          )}

          {this.isLoadingPage && m(LoadingIndicator, { size: 'large' })}
        </section>
        <div className="RecycleBinPage-massActions">{this.massActions().toArray()}</div>
        <nav className="RecycleBinPage-gridPagination">
          {m(Button, {
            disabled: this.pageNumber === 0,
            title: app.translator.trans('walsgit-recycle-bin.admin.pagination.first_page_button'),
            onclick: this.goToPage.bind(this, 1),
            icon: 'fas fa-step-backward',
            className: 'Button Button--icon RecycleBinPage-firstPageBtn',
          })}
          {m(Button, {
            disabled: this.pageNumber === 0,
            title: app.translator.trans('walsgit-recycle-bin.admin.pagination.back_button'),
            onclick: this.previousPage.bind(this),
            icon: 'fas fa-chevron-left',
            className: 'Button Button--icon RecycleBinPage-backBtn',
          })}
          <span className="RecycleBinPage-pageNumber">
            {app.translator.trans('walsgit-recycle-bin.admin.pagination.page_counter', {
              current: (
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={this.loadingPageNumber + 1}
                  aria-label={extractText(app.translator.trans('walsgit-recycle-bin.admin.pagination.go_to_page_textbox_a11y_label'))}
                  autoComplete="off"
                  className="FormControl RecycleBinPage-pageNumberInput"
                  onchange={(e: InputEvent) => {
                    const target = e.target as HTMLInputElement;
                    let pageNumber = parseInt(target.value);

                    if (isNaN(pageNumber)) {
                      target.value = (this.pageNumber + 1).toString();
                      return;
                    }

                    if (pageNumber < 1) {
                      pageNumber = 1;
                    } else if (pageNumber > this.getTotalPageCount()) {
                      pageNumber = this.getTotalPageCount();
                    }

                    target.value = pageNumber.toString();

                    this.goToPage(pageNumber);
                  }}
                />
              ),
              currentNum: this.pageNumber + 1,
              total: this.getTotalPageCount(),
            })}
          </span>
          {m(Button, {
            disabled: !this.moreData,
            title: app.translator.trans('walsgit-recycle-bin.admin.pagination.next_button'),
            onclick: this.nextPage.bind(this),
            icon: 'fas fa-chevron-right',
            className: 'Button Button--icon RecycleBinPage-nextBtn',
          })}
          {m(Button, {
            disabled: !this.moreData,
            title: app.translator.trans('walsgit-recycle-bin.admin.pagination.last_page_button'),
            onclick: this.goToPage.bind(this, this.getTotalPageCount()),
            icon: 'fas fa-step-forward',
            className: 'Button Button--icon RecycleBinPage-lastPageBtn',
          })}
        </nav>
      </div>
    );
  }

  headerItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'search',
      <div className="Search-input">
        <input
          className="FormControl SearchBar"
          type="search"
          placeholder={app.translator.trans('walsgit-recycle-bin.admin.search_post_placeholder')}
          oninput={(e: InputEvent) => {
            this.isLoadingPage = true;
            this.query = (e?.target as HTMLInputElement)?.value;
            this.throttledSearch();
          }}
        />
      </div>,
      100
    );

    items.add(
      'searchHelpText',
      <div class="helpText">
        <Icon name="fas fa-info-circle" /> {app.translator.trans('walsgit-recycle-bin.admin.search_post_help_text')}
      </div>,
      95
    );

    items.add(
      'totalHiddenDiscussions',
      <p class="RecycleBinPage-totalDiscussions">
        {app.translator.trans('walsgit-recycle-bin.admin.total_hidden_posts')}: {this.hiddenPostsCount()}
      </p>,
      90
    );

    return items;
  }

  /**
   * Build an item list of columns to show for each hidden discussion.
   *
   * Each column in the list should be an object with keys `name` and `content`.
   *
   * `name` is a string that will be used as the column name.
   * `content` is a function with the Discussion model passed as the first and only argument.
   */
  columns(): ItemList<ColumnData> {
    const columns = new ItemList<ColumnData>();

    columns.add(
      'selection',
      {
        name: '',
        content: (post: Post) => {
          return (
            <input
              type="checkbox"
              className="RecycleBinPage-Checkbox"
              onclick={(e: Event) => {
                const id = post.id();
                if (id !== undefined) {
                  this.togglePostSelection(e, id);
                }
              }}
            />
          );
        },
      },
      100
    );

    columns.add(
      'id',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.post.id'),
        content: (post: Post) => post.id() ?? null,
      },
      99
    );

    columns.add(
      'post',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.post.title'),
        content: (post: Post) => {
          const postUrl = `${app.forum.attribute('baseUrl')}/d/${post.discussion().slug()}/${post.number()}`;

          return (
            <span>
              {truncate(post.content() || '', 100)}{' '}
              <a href={postUrl} target="_blank">
                {app.translator.trans('walsgit-recycle-bin.admin.post.open_post')}
              </a>
            </span>
          );
        },
      },
      90
    );

    columns.add(
      'author',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.author'),
        content: (post: Post) => {
          const user = post.user() as User;
          return user && typeof user.displayName === 'function' ? user.displayName() : app.translator.trans('walsgit-recycle-bin.admin.unknown_user');
        },
      },
      85
    );

    columns.add(
      'createdAt',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.created_at'),
        content: (post: Post) => (
          <span className="DiscussionList-creationDate" title={post.createdAt()}>
            {/*dayjs(discussion.createdAt()).format('LLL')*/}
            {post.createdAt() ? humanTime(post.createdAt() as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}
          </span>
        ),
      },
      80
    );

    columns.add(
      'hiddenAt',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.hidden_at'),
        content: (post: Post) => (
          <span className="DiscussionList-hiddenDate" title={post.hiddenAt()}>
            {post.hiddenAt() ? humanTime(post.hiddenAt() as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}
          </span>
        ),
      },
      80
    );

    columns.add(
      'actions',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.actions'),
        content: (post: Post) => (
          <>
            {m(
              Button,
              {
                className: 'Button DiscussionList-editModalBtn',
                title: app.translator.trans('walsgit-recycle-bin.admin.restore_post_tooltip', { discussion: post.id() }), // TODO disc title
                onclick: () => app.modal.show(RestorePostModal, { post: post, postRestored: this.postRestored }),
              },
              <Icon name="fas fa-trash-restore" />
            )}
            {m(
              Button,
              {
                className: 'Button DiscussionList-editModalBtn',
                title: app.translator.trans('walsgit-recycle-bin.admin.delete_post_tooltip', { discussion: post.id() }), // TODO disc title
                onclick: () => app.modal.show(DeletePostModal, { post: post, postDeleted: this.postDeleted }),
              },
              <Icon name="fas fa-times" />
            )}
          </>
        ),
      },
      -90
    );

    return columns;
  }

  /**
   * Build an item list of mass actions buttons to show under the hidden discussions list.
   */
  massActions(): ItemList<Mithril.Children> {
    const massActions = new ItemList<Mithril.Children>();
    const hasSelection = this.selectedPosts.size > 0;

    massActions.add('actionsLabel', <span>{app.translator.trans('walsgit-recycle-bin.admin.bulk_post_actions')}</span>, 100);

    massActions.add(
      'massRestore',
      <button
        className="Button"
        onclick={() => {
          app.modal.show(MassRestorePostModal, { selectedPosts: this.selectedPosts });
        }}
        disabled={!hasSelection}
      >
        <Icon name="fas fa-trash-restore" /> {app.translator.trans('walsgit-recycle-bin.admin.bulk_post_restore_label')}
      </button>,
      90
    );

    massActions.add(
      'massDelete',
      <button
        className="Button"
        onclick={() => {
          app.modal.show(MassDeletePostModal, { selectedPosts: this.selectedPosts });
        }}
        disabled={!hasSelection}
      >
        <Icon name="fas fa-times" /> {app.translator.trans('walsgit-recycle-bin.admin.bulk_post_delete_label')}
      </button>,
      80
    );

    massActions.add(
      'massHelpText',
      <div className="helpText">
        <Icon name="fas fa-info-circle" /> {app.translator.trans('walsgit-recycle-bin.admin.mass_help_text')}
      </div>,
      70
    );

    return massActions;
  }

  /**
   * Asynchronously fetch the next set of hidden discussions to be rendered.
   *
   * Returns an array of Discussions, plus the raw API payload.
   *
   * Uses the `this.numPerPage` as the response limit, and automatically calculates the offset required from `pageNumber`.
   *
   * @param pageNumber The **zero-based** page number to load and display
   */
  async loadPage(pageNumber: number) {
    if (pageNumber < 0) pageNumber = 0;

    this.loadingPageNumber = pageNumber;
    this.setPageNumberInUrl(pageNumber + 1);

    this.selectedPosts.clear();

    const query = this.query.trim();

    app.store
      .find<Post[]>('posts', {
        filter: { hidden: true, content: query },
        page: {
          limit: this.numPerPage,
          offset: pageNumber * this.numPerPage,
        },
      })
      .then((apiData) => {
        // Next link won't be present if there's no more data
        this.moreData = !!apiData.payload?.links?.next;

        let data = apiData.filter((post: Post) => post.isHidden());

        // @ts-ignore
        delete data.payload;

        const lastPage = this.getTotalPageCount();

        if (pageNumber > lastPage) {
          this.loadPage(lastPage - 1);
        } else {
          this.pageData = data;
          this.pageNumber = pageNumber;
          this.loadingPageNumber = pageNumber;
          this.isLoadingPage = false;
        }

        m.redraw();
      })
      .catch((err: Error) => {
        console.error(err);
        this.pageData = [];
      });
  }
  nextPage() {
    this.isLoadingPage = true;
    this.loadPage(this.pageNumber + 1);
  }

  previousPage() {
    this.isLoadingPage = true;
    this.loadPage(this.pageNumber - 1);
  }

  /**
   * @param page The **1-based** page number
   */
  goToPage(page: number) {
    this.isLoadingPage = true;
    this.loadPage(page - 1);
  }

  private setPageNumberInUrl(pageNumber: number) {
    const search = window.location.hash.split('?', 2);
    const params = new URLSearchParams(search?.[1] ?? '');

    params.set('page', `${pageNumber}`);
    window.location.hash = search?.[0] + '?' + params.toString();
  }
}
