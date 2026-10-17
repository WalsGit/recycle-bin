import Page, { IPageAttrs } from 'flarum/common/components/Page';
import Mithril from 'mithril';
import app from 'flarum/admin/app';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import ItemList from 'flarum/common/utils/ItemList';
import classList from 'flarum/common/utils/classList';
import extractText from 'flarum/common/utils/extractText';
import { debounce } from 'flarum/common/utils/throttleDebounce';
import Stream from 'flarum/common/utils/Stream';
import Model from 'flarum/common/Model';
import ItemActionModal, { BinAction, BinItemType } from './ItemActionModal';
import MassActionModal from './MassActionModal';
import Icon from 'flarum/common/components/Icon';
import humanTime from 'flarum/common/helpers/humanTime';

export type ColumnData<ModelType = any> = {
  name: Mithril.Children;
  content: (item: ModelType) => Mithril.Children;
};

export default abstract class AbstractBinPage<ModelType extends Model = any> extends Page {
  protected query: string = '';
  protected readonly throttledSearch = debounce(250, () => this.loadPage(0));
  protected abstract readonly itemsCount: Stream<number>;

  protected readonly numPerPage: number = 25;
  protected pageNumber: number = 0;
  protected loadingPageNumber: number = 0;
  protected pageData: ModelType[] | undefined = undefined;
  protected moreData: boolean = false;
  protected isLoadingPage: boolean = false;
  private latestRequestId: number = 0;
  protected readonly selectedIds: Set<string> = new Set();

  protected isSearching(): boolean {
    return this.query.trim() !== '';
  }

  protected getTotalPageCount(): number {
    if (this.isSearching()) {
      return this.pageNumber + (this.moreData ? 2 : 1);
    }

    const count = this.itemsCount();
    if (count === -1 || Number.isNaN(count)) return 1;

    return Math.max(1, Math.ceil(count / this.numPerPage));
  }

  protected refreshStatistics(): void {
    app
      .request<Record<string, number>>({
        method: 'GET',
        url: `${app.forum.attribute('apiUrl')}/recycle-bin/statistics`,
      })
      .then((result) => {
        // Response keys are `hidden_discussions_count` & `hidden_posts_count`
        this.itemsCount(result[`hidden_${this.getModelName()}s_count`]);
        m.redraw();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  protected abstract getApiResourceType(): string;
  protected abstract getTitleTranslationKey(): string;
  protected abstract getModelName(): BinItemType;
  protected abstract getSearchPlaceholderKey(): string;
  protected abstract getSearchHelpTextKey(): string;
  protected abstract getTotalLabelKey(): string;

  oninit(vnode: Mithril.Vnode<IPageAttrs, this>) {
    super.oninit(vnode);

    this.refreshStatistics();

    const pageParam = Number.parseInt(m.route.param('page'));
    this.pageNumber = !Number.isNaN(pageParam) && pageParam > 0 ? pageParam - 1 : 0;
    this.query = m.route.param('q') || '';

    void this.loadPage(this.pageNumber);
  }

  view(vnode: Mithril.Vnode<IPageAttrs, this>): Mithril.Children {
    if (this.pageData === undefined) {
      return (
        <div className="ExtensionPage-settings">
          <div className="container">
            <section className="RecycleBinPage-grid RecycleBinPage-grid--loading">
              {m(LoadingIndicator, { containerClassName: 'LoadingIndicator--block', size: 'large' })}
            </section>
          </div>
        </div>
      );
    }

    const columns = this.columns().toArray();
    const isEmpty = this.pageData.length === 0;

    return (
      <div className="ExtensionPage-settings">
        <h2>{app.translator.trans(this.getTitleTranslationKey())}</h2>
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
            <div
              key={`header-${column.itemName || colIndex}`}
              className="RecycleBinPage-grid-header"
              role="columnheader"
              aria-colindex={colIndex + 1}
              aria-rowindex={1}
            >
              {column.name}
            </div>
          ))}

          {this.pageData.map((item: any, rowIndex) =>
            columns.map((col, colIndex) => {
              const columnContent = col.content?.(item);

              return (
                <div
                  key={`${item.id()}-${col.itemName || colIndex}`}
                  className={classList(['RecycleBinPage-grid-rowItem', rowIndex % 2 > 0 && 'RecycleBinPage-grid-rowItem--shaded'])}
                  {...{ [`data-${this.getModelName()}-id`]: item.id() }}
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

          {isEmpty && (
            <div className="RecycleBinPage-grid-empty" role="row">
              {app.translator.trans(
                this.isSearching() ? 'walsgit-recycle-bin.admin.no_search_results' : `walsgit-recycle-bin.admin.empty_${this.getModelName()}s_list`
              )}
            </div>
          )}

          {this.isLoadingPage && m(LoadingIndicator, { size: 'large' })}
        </section>

        <div className="RecycleBinPage-massActions">{this.massActions().toArray()}</div>

        <nav className="RecycleBinPage-gridPagination">
          {m(Button, {
            disabled: this.pageNumber === 0,
            title: app.translator.trans('walsgit-recycle-bin.admin.pagination.first_page_button'),
            ariaLabel: app.translator.trans('walsgit-recycle-bin.admin.pagination.first_page_button'),
            onclick: this.goToPage.bind(this, 1),
            icon: 'fas fa-step-backward',
            className: 'Button Button--icon RecycleBinPage-firstPageBtn',
          })}
          {m(Button, {
            disabled: this.pageNumber === 0,
            title: app.translator.trans('walsgit-recycle-bin.admin.pagination.back_button'),
            ariaLabel: app.translator.trans('walsgit-recycle-bin.admin.pagination.back_button'),
            onclick: this.previousPage.bind(this),
            icon: 'fas fa-chevron-left',
            className: 'Button Button--icon RecycleBinPage-backBtn',
          })}
          <span className="RecycleBinPage-pageNumber">
            {app.translator.trans(
              this.isSearching() ? 'walsgit-recycle-bin.admin.pagination.page_counter_search' : 'walsgit-recycle-bin.admin.pagination.page_counter',
              {
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
                      let pageNumber = Number.parseInt(target.value);

                      if (Number.isNaN(pageNumber)) {
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
              }
            )}
          </span>
          {m(Button, {
            disabled: !this.moreData,
            title: app.translator.trans('walsgit-recycle-bin.admin.pagination.next_button'),
            ariaLabel: app.translator.trans('walsgit-recycle-bin.admin.pagination.next_button'),
            onclick: this.nextPage.bind(this),
            icon: 'fas fa-chevron-right',
            className: 'Button Button--icon RecycleBinPage-nextBtn',
          })}
          {m(Button, {
            disabled: !this.moreData || this.isSearching(),
            title: app.translator.trans('walsgit-recycle-bin.admin.pagination.last_page_button'),
            ariaLabel: app.translator.trans('walsgit-recycle-bin.admin.pagination.last_page_button'),
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
          placeholder={extractText(app.translator.trans(this.getSearchPlaceholderKey()))}
          value={this.query}
          oninput={(e: InputEvent) => {
            this.query = (e.target as HTMLInputElement).value;
            this.throttledSearch();
          }}
        />
      </div>,
      100
    );

    items.add(
      'searchHelpText',
      <div className="helpText">
        <Icon name="fas fa-info-circle" /> {app.translator.trans(this.getSearchHelpTextKey())}
      </div>,
      95
    );

    items.add(
      'totalHiddenItems',
      <p className="RecycleBinPage-total">
        {app.translator.trans(this.getTotalLabelKey())}: {this.itemsCount()}
      </p>,
      90
    );

    return items;
  }

  /**
   * Build an item list of common columns to show in each BinPage
   *
   * subclasses should call super.columns() to add their own columns.
   */
  columns(): ItemList<ColumnData<ModelType>> {
    const items = new ItemList<ColumnData<ModelType>>();
    const type = this.getModelName();
    const baseUrl = app.forum.attribute('baseUrl') as string;

    const tooltip = (action: BinAction, item: ModelType): string =>
      extractText(app.translator.trans(`walsgit-recycle-bin.admin.${action}_${type}_tooltip`, { [`${type}Id`]: item.id() }));

    items.add(
      'select',
      {
        name: (
          <input
            type="checkbox"
            className="RecycleBinPage-Checkbox"
            checked={this.isAllSelected()}
            disabled={!this.pageData?.length}
            aria-label={extractText(app.translator.trans('walsgit-recycle-bin.admin.select_all'))}
            onchange={() => this.toggleSelectAll()}
          />
        ),
        content: (item: ModelType) => (
          <input
            type="checkbox"
            className="RecycleBinPage-Checkbox"
            checked={this.selectedIds.has(item.id()!)}
            onchange={(e: Event) => this.toggleSelection(e, item.id()!)}
          />
        ),
      },
      100
    );

    items.add(
      'user',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.author'),
        content: (item: ModelType) => {
          const user = (item as any).user();

          if (!user || typeof user.displayName !== 'function') {
            return app.translator.trans('walsgit-recycle-bin.admin.unknown_user');
          }

          return (
            <a href={`${baseUrl}/u/${user.slug()}`} target="_blank">
              {user.displayName()}
            </a>
          );
        },
      },
      85
    );

    const dateColumn = (nameKey: string, className: string, getDate: (item: any) => Date | null | undefined): ColumnData<ModelType> => ({
      name: app.translator.trans(nameKey),
      content: (item: ModelType) => {
        const date = getDate(item);

        return (
          <span className={className} title={date ? String(date) : undefined}>
            {date ? humanTime(date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}
          </span>
        );
      },
    });

    items.add(
      'createdAt',
      dateColumn('walsgit-recycle-bin.admin.created_at', 'DiscussionList-creationDate', (item) => item.createdAt()),
      75
    );

    items.add(
      'hiddenAt',
      dateColumn('walsgit-recycle-bin.admin.hidden_at', 'DiscussionList-hiddenDate', (item) => item.hiddenAt()),
      70
    );

    items.add(
      'actions',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.actions'),
        content: (item: ModelType) => [
          m(
            Button,
            {
              className: 'Button DiscussionList-editModalBtn',
              title: tooltip('restore', item),
              ariaLabel: tooltip('restore', item),
              onclick: () => this.openItemModal(item, 'restore'),
            },
            <Icon name="fas fa-trash-restore" />
          ),
          m(
            Button,
            {
              className: 'Button DiscussionList-editModalBtn',
              title: tooltip('delete', item),
              ariaLabel: tooltip('delete', item),
              onclick: () => this.openItemModal(item, 'delete'),
            },
            <Icon name="fas fa-times" />
          ),
        ],
      },
      -90
    );

    return items;
  }

  massActions(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();
    const hasSelection = this.selectedIds.size > 0;

    // Translation keys for posts contain a `post_` infix (e.g. `bulk_post_actions`)
    const infix = this.getModelName() === 'post' ? 'post_' : '';
    const prefix = 'walsgit-recycle-bin.admin';

    items.add('actionsLabel', <span>{app.translator.trans(`${prefix}.bulk_${infix}actions`)}</span>, 100);

    items.add(
      'restore',
      <button className="Button" disabled={!hasSelection} onclick={() => this.openMassModal('restore')}>
        <Icon name="fas fa-trash-restore" /> {app.translator.trans(`${prefix}.bulk_${infix}restore_label`)}
      </button>,
      90
    );

    items.add(
      'delete',
      <button className="Button" disabled={!hasSelection} onclick={() => this.openMassModal('delete')}>
        <Icon name="fas fa-times" /> {app.translator.trans(`${prefix}.bulk_${infix}delete_label`)}
      </button>,
      80
    );

    items.add(
      'deleteAll',
      <button className="Button" disabled={this.itemsCount() === 0 || this.isSearching()} onclick={() => this.openMassModal('delete', true)}>
        <Icon name="fas fa-trash" /> {app.translator.trans(`${prefix}.bulk_${infix}delete_all_label`)}
      </button>,
      70
    );

    return items;
  }

  protected isAllSelected(): boolean {
    return !!this.pageData?.length && this.pageData.every((item) => this.selectedIds.has(item.id()!));
  }

  protected toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.selectedIds.clear();
    } else {
      this.pageData?.forEach((item) => this.selectedIds.add(item.id()!));
    }

    m.redraw();
  }

  protected toggleSelection(e: Event, itemId: string): void {
    const checkbox = e.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selectedIds.add(itemId);
    } else {
      this.selectedIds.delete(itemId);
    }

    m.redraw();
  }

  protected openItemModal(item: ModelType, action: BinAction): void {
    void app.modal.show(ItemActionModal, {
      item,
      type: this.getModelName(),
      action,
      onSuccess: () => {
        this.selectedIds.delete(item.id()!);
        void this.refreshAfterChange();
      },
    });
  }

  protected openMassModal(action: BinAction, all: boolean = false): void {
    void app.modal.show(MassActionModal, {
      selectedIds: this.selectedIds,
      type: this.getModelName(),
      action,
      all,
      totalCount: this.itemsCount(),
      onSuccess: () => {
        this.selectedIds.clear();

        if (all) {
          this.query = '';
          void this.loadPage(0);
          this.refreshStatistics();
        } else {
          void this.refreshAfterChange();
        }
      },
    });
  }

  protected async refreshAfterChange(): Promise<void> {
    await this.loadPage(this.pageNumber);

    // The last item of the page was processed: go back one page instead of showing an empty one
    if (this.pageData?.length === 0 && this.pageNumber > 0) {
      await this.loadPage(this.pageNumber - 1);
    }

    this.refreshStatistics();
  }

  async loadPage(pageNumber: number): Promise<void> {
    const requestId = ++this.latestRequestId;

    this.isLoadingPage = true;
    this.loadingPageNumber = pageNumber;
    m.redraw();

    const limit = this.numPerPage;
    const offset = pageNumber * limit;

    let filter: any = {
      q: this.query || undefined,
    };

    if (this.getModelName() === 'discussion') {
      const is = app.translator.trans('core.lib.gambits.group_keys.is');
      const hidden = app.translator.trans('core.lib.gambits.discussions.hidden.key');
      filter = { q: `${is}:${hidden} ${this.query}`.trim() };
    } else if (this.getModelName() === 'post') {
      filter = {
        hidden: 'true',
        content: this.query.trim() || undefined,
      };
    }

    try {
      const results: any = await app.store.find(this.getApiResourceType(), {
        filter,
        page: {
          limit,
          offset,
        },
      });

      if (requestId !== this.latestRequestId) return;

      this.selectedIds.clear();

      this.pageData = results as ModelType[];
      this.moreData = !!results.payload?.links?.next;
      this.pageNumber = pageNumber;
      this.setPageNumberInUrl(pageNumber);
    } catch (error) {
      if (requestId !== this.latestRequestId) return;

      console.error(error);
      this.pageData = [];
    } finally {
      if (requestId === this.latestRequestId) {
        this.isLoadingPage = false;
        m.redraw();
      }
    }
  }

  nextPage() {
    if (this.moreData && !this.isLoadingPage) {
      void this.loadPage(this.pageNumber + 1);
    }
  }

  previousPage() {
    if (this.pageNumber > 0 && !this.isLoadingPage) {
      void this.loadPage(this.pageNumber - 1);
    }
  }

  goToPage(page: number) {
    const pageNumber = page - 1;
    if (pageNumber >= 0 && pageNumber < this.getTotalPageCount() && !this.isLoadingPage) {
      void this.loadPage(pageNumber);
    }
  }

  protected setPageNumberInUrl(pageNumber: number) {
    const bin = m.route.param().bin || 'discussions-bin';

    const path = app.route('extension', {
      id: 'walsgit-recycle-bin',
      bin,
      page: pageNumber + 1,
      q: this.query.trim() || undefined,
    });

    // The router prefix (e.g. `#`) must be added back, as replaceState bypasses the router
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${m.route.prefix}${path}`);
  }
}
