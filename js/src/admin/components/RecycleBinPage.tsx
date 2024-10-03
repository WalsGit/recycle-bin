import Mithril from 'mithril';

import app from 'flarum/admin/app';

import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';

import icon from 'flarum/common/helpers/icon';

import type User from 'flarum/common/models/User';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Discussion from 'flarum/common/models/Discussion';

import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';
import extractText from 'flarum/common/utils/extractText';
import { debounce } from 'flarum/common/utils/throttleDebounce';
import { ComponentAttrs } from 'flarum/common/Component'; 
import humanTime from 'flarum/common/helpers/humanTime';

import RestoreDiscussionModal from './RestoreDiscussionModal';
import DeleteDiscussionModal from './DeleteDiscussionModal';



type ColumnData = {
  /**
   * Column title
   */
  name: Mithril.Children;
  /**
   * Component(s) to show for this column.
   */
  content: (discussion: Discussion) => Mithril.Children;
};

/**
 * Admin page which displays a paginated list of all hidden discussions on the forum.
 */
export default class RecycleBinPage extends ExtensionPage {
  private query: string = '';
  private throttledSearch = debounce(250, () => this.loadPage(0));

  /**
   * Number of users to load per page.
   */
  private numPerPage: number = 10;

  /**
   * Current page number. Zero-indexed.
   */
  private pageNumber: number = 0;

  /**
   * Page number being loaded. Zero-indexed.
   */
  private loadingPageNumber: number = 0;

  /**
   * Total number of forum users.
   *
   * Fetched from the active `AdminApplication` (`app`), with
   * data provided by `AdminPayload.php`, or `flarum/statistics`
   * if installed.
   */
  readonly hiddenDiscussionsCount: number = app.data.modelStatistics.users.total; // =========== TODO: find a way to get the number of hidden discussions

  /**
   * Get total number of user pages.
   */
  private getTotalPageCount(): number {
    if (this.hiddenDiscussionsCount === -1) return 0;

    return Math.ceil(this.hiddenDiscussionsCount / this.numPerPage);
  }

  /**
   * This page's array of users.
   *
   * `undefined` when page loads as no data has been fetched.
   */
  private pageData: Discussion[] | undefined = undefined;

  /**
   * Are there more users available?
   */
  private moreData: boolean = false;

  private isLoadingPage: boolean = false;

  oninit(vnode: Mithril.Vnode<ComponentAttrs, this>) {
    super.oninit(vnode);

    // Get page query value from URL
    const page = parseInt(m.route.param('page'));

    if (isNaN(page) || page < 1) {
      this.setPageNumberInUrl(1);
      this.pageNumber = 0;
    } else {
      this.pageNumber = page - 1;
    }

    this.loadingPageNumber = this.pageNumber;
  }

  /**
   * Component to render.
   */
  content(vnode: Mithril.VnodeDOM<ExtensionPageAttrs, this>): Mithril.Vnode<{}, {}> {
    if (typeof this.pageData === 'undefined') {
      this.loadPage(this.pageNumber);

      return (
        <div className="extensionPage-settings">
          <div className="container">
            <section className="RecycleBinPage-grid RecycleBinPage-grid--loading">
              <LoadingIndicator containerClassName="LoadingIndicator--block" size="large" />
            </section>
          </div>
        </div>
      );
    }

    const columns = this.columns().toArray();

    return (
      <div className='ExtensionPage-settings'>
        <div className="container">
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

            {this.pageData.map((discussion, rowIndex) =>
              columns.map((col, colIndex) => {
                const columnContent = col.content && col.content(discussion);

                return (
                  <div
                    className={classList(['RecycleBinPage-grid-rowItem', rowIndex % 2 > 0 && 'RecycleBinPage-grid-rowItem--shaded'])}
                    data-user-id={discussion.id()}
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

            {this.isLoadingPage && <LoadingIndicator size="large" />}
          </section>
          <nav className="RecycleBinPage-gridPagination">
            <Button
              disabled={this.pageNumber === 0}
              title={app.translator.trans('walsgit-recycle-bin.admin.pagination.first_page_button')}
              onclick={this.goToPage.bind(this, 1)}
              icon="fas fa-step-backward"
              className="Button Button--icon RecycleBinPage-firstPageBtn"
            />
            <Button
              disabled={this.pageNumber === 0}
              title={app.translator.trans('walsgit-recycle-bin.admin.pagination.back_button')}
              onclick={this.previousPage.bind(this)}
              icon="fas fa-chevron-left"
              className="Button Button--icon RecycleBinPage-backBtn"
            />
            <span className="RecycleBinPage-pageNumber">
              {app.translator.trans('walsgit-recycle-bin.admin.pagination.page_counter', {
                current: (
                  <input
                    type="text"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    value={this.loadingPageNumber + 1}
                    aria-label={extractText(app.translator.trans('walsgit-recycle-bin.admin.pagination.go_to_page_textbox_a11y_label'))}
                    autocomplete="off"
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
            <Button
              disabled={!this.moreData}
              title={app.translator.trans('walsgit-recycle-bin.admin.pagination.next_button')}
              onclick={this.nextPage.bind(this)}
              icon="fas fa-chevron-right"
              className="Button Button--icon RecycleBinPage-nextBtn"
            />
            <Button
              disabled={!this.moreData}
              title={app.translator.trans('walsgit-recycle-bin.admin.pagination.last_page_button')}
              onclick={this.goToPage.bind(this, this.getTotalPageCount())}
              icon="fas fa-step-forward"
              className="Button Button--icon RecycleBinPage-lastPageBtn"
            />
          </nav>
        </div>
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
          placeholder={app.translator.trans('walsgit-recycle-bin.admin.search_placeholder')}
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
      'totalHiddenDiscussions',
      <p class="RecycleBinPage-totalUsers">{app.translator.trans('walsgit-recycle-bin.admin.total_hidden_discussions', { count: this.hiddenDiscussionsCount })}</p>,
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
   * `content` is a function with the User model passed as the first and only argument.
   *
   * See `RecycleBinPage.tsx` for examples.
   */
  columns(): ItemList<ColumnData> {
    const columns = new ItemList<ColumnData>();

    columns.add(
      'id',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.discussion_id'),
        content: (discussion: Discussion) => discussion.id() ?? null,
      },
      100
    );

    columns.add(
      'discussionTitle',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.discussion_title'),
        content: (discussion: Discussion) => {
          const discussionUrl = `${app.forum.attribute('baseUrl')}/d/${discussion.slug()}`;

          return (
            <a
              target="_blank"
              href={discussionUrl}
              title={app.translator.trans('walsgit-recycle-bin.admin.discussion_link_tooltip')}
            >
              {discussion.title()}
            </a>
          );
        },
      },
      90
    );

    columns.add(
      'author',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.discussion_author'),
        content: (discussion: Discussion) => {
          const user = (discussion.user() as User);
          return user && typeof user.displayName === 'function'
            ? user.displayName()
            : app.translator.trans('walsgit-recycle-bin.admin.unknown_user');
        },
      },
      85
    );

    columns.add(
      'createdAt',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.created_at'),
        content: (discussion: Discussion) => (
          <span className="DiscussionList-creationDate" title={discussion.createdAt()}>
            {/*dayjs(discussion.createdAt()).format('LLL')*/}
            {discussion.createdAt() ? humanTime(discussion.createdAt() as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}

          </span>
        ),
      },
      80
    );
    
    columns.add(
      'hiddenAt',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.hidden_at'),
        content: (discussion: Discussion) => (
          <span className="DiscussionList-hiddenDate" title={discussion.hiddenAt()}>
            {discussion.hiddenAt() ? humanTime(discussion.hiddenAt() as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}
          </span>
        ),
      },
      80
    );

    // columns.add(
    //   'groupBadges',
    //   {
    //     name: app.translator.trans('walsgit-recycle-bin.admin.grid.columns.group_badges.title'),
    //     content: (discussion: Discussion) => {
    //       const badges = user.badges().toArray();

    //       if (badges.length) {
    //         return <ul className="DiscussionHero-badges badges">{listItems(badges)}</ul>;
    //       } else {
    //         return app.translator.trans('walsgit-recycle-bin.admin.grid.columns.group_badges.no_badges');
    //       }
    //     },
    //   },
    //   70
    // );

    columns.add(
      'actions',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.actions'),
        content: (discussion: Discussion) => (
          <>
            <Button
              className="Button DiscussionList-editModalBtn"
              title={app.translator.trans('walsgit-recycle-bin.admin.restore_tooltip', { discussion: discussion.title() })}
              onclick={() => app.modal.show(RestoreDiscussionModal, { discussion })}
            >
              {icon('fas fa-trash-restore')}
            </Button>
            <Button
            className="Button DiscussionList-editModalBtn"
            title={app.translator.trans('walsgit-recycle-bin.admin.delete_tooltip', { discussion: discussion.title() })}
            onclick={() => app.modal.show(DeleteDiscussionModal, { discussion })}
          >
            {icon('fas fa-times')}
          </Button>
        </>
        ),
      },
      -90
    );

    return columns;
  }

  /**
   * Asynchronously fetch the next set of users to be rendered.
   *
   * Returns an array of Users, plus the raw API payload.
   *
   * Uses the `this.numPerPage` as the response limit, and automatically calculates the offset required from `pageNumber`.
   *
   * @param pageNumber The **zero-based** page number to load and display
   */
  async loadPage(pageNumber: number) {
    if (pageNumber < 0) pageNumber = 0;

    this.loadingPageNumber = pageNumber;
    this.setPageNumberInUrl(pageNumber + 1);

    app.store
      .find<Discussion[]>('discussions', {
        filter: { q: this.query },
        page: {
          limit: this.numPerPage,
          offset: pageNumber * this.numPerPage,
        },
      })
      .then((apiData) => {
        // Next link won't be present if there's no more data
        this.moreData = !!apiData.payload?.links?.next;

        let data = apiData.filter((discussion: Discussion) => discussion.isHidden());

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