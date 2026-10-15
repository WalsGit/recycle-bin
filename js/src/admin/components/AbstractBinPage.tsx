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

export default abstract class AbstractBinPage<ModelType = any> extends Page {
  protected query: string = '';
  protected readonly throttledSearch = debounce(250, () => this.loadPage(0));
  protected abstract readonly itemRestored: Stream<boolean>;
  protected abstract readonly itemDeleted: Stream<boolean>;
  protected abstract readonly itemsCount: Stream<number>;

  protected readonly numPerPage: number = 25;
  protected pageNumber: number = 0;
  protected loadingPageNumber: number = 0;
  protected pageData: ModelType[] | undefined = undefined;
  protected moreData: boolean = false;
  protected isLoadingPage: boolean = false;

  protected getTotalPageCount(): number {
    const count = this.itemsCount();
    if (count === -1 || Number.isNaN(count)) return 0;

    return Math.ceil(count / this.numPerPage);
  }

  protected abstract toggleSelection(e: Event, itemId: string): void;
  protected abstract refreshStatistics(): void;
  protected abstract getApiUrl(): string;
  protected abstract getTitleTranslationKey(): string;
  protected abstract getModelName(): string;

  oninit(vnode: Mithril.Vnode<IPageAttrs, this>) {
    super.oninit(vnode);

    this.refreshStatistics();

    const pageParam = Number.parseInt(m.route.param('page'));
    this.pageNumber = !Number.isNaN(pageParam) && pageParam > 0 ? pageParam - 1 : 0;

    void this.loadPage(this.pageNumber);

    this.itemRestored.map((restored: boolean) => {
      if (restored) {
        void this.loadPage(this.pageNumber);
        this.itemsCount(this.itemsCount() - 1);
        this.itemRestored(false);
      }
    });

    this.itemDeleted.map((deleted: boolean) => {
      if (deleted) {
        void this.loadPage(this.pageNumber);
        this.itemsCount(this.itemsCount() - 1);
        this.itemDeleted(false);
      }
    });
  }

  onbeforeupdate(vnode: Mithril.Vnode<IPageAttrs, this>) {
    super.onbeforeupdate(vnode);

    const pageParam = Number.parseInt(m.route.param('page'));
    const newPageNumber = !Number.isNaN(pageParam) && pageParam > 0 ? pageParam - 1 : 0;

    if (newPageNumber !== this.pageNumber) {
      this.pageNumber = newPageNumber;
      void this.loadPage(this.pageNumber);
    }
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
            })}
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
            disabled: !this.moreData,
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

  abstract headerItems(): ItemList<Mithril.Children>;
  abstract columns(): ItemList<any>;
  abstract massActions(): ItemList<Mithril.Children>;

  async loadPage(pageNumber: number): Promise<void> {
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
      const results: any = await app.store.find(this.getApiUrl(), {
        filter,
        page: {
          limit,
          offset,
        },
      });

      this.pageData = results as ModelType[];
      this.moreData = !!results.payload?.links?.next;
      this.pageNumber = pageNumber;
      this.setPageNumberInUrl(pageNumber);
    } catch (error) {
      console.error(error);
      this.pageData = [];
    } finally {
      this.isLoadingPage = false;
      m.redraw();
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
    void m.route.set(
      app.route('extension', {
        id: 'walsgit-recycle-bin',
        bin,
        page: pageNumber + 1,
      }),
      undefined,
      { replace: true }
    );
  }
}
