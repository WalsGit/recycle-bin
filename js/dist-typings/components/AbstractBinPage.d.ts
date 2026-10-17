import Page, { IPageAttrs } from 'flarum/common/components/Page';
import Mithril from 'mithril';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import Model from 'flarum/common/Model';
import { BinAction, BinItemType } from './ItemActionModal';
export type ColumnData<ModelType = any> = {
    name: Mithril.Children;
    content: (item: ModelType) => Mithril.Children;
};
export default abstract class AbstractBinPage<ModelType extends Model = any> extends Page {
    protected query: string;
    protected readonly throttledSearch: any;
    protected abstract readonly itemsCount: Stream<number>;
    protected readonly numPerPage: number;
    protected pageNumber: number;
    protected loadingPageNumber: number;
    protected pageData: ModelType[] | undefined;
    protected moreData: boolean;
    protected isLoadingPage: boolean;
    private latestRequestId;
    protected readonly selectedIds: Set<string>;
    protected isSearching(): boolean;
    protected getTotalPageCount(): number;
    protected refreshStatistics(): void;
    protected abstract getApiResourceType(): string;
    protected abstract getTitleTranslationKey(): string;
    protected abstract getModelName(): BinItemType;
    protected abstract getSearchPlaceholderKey(): string;
    protected abstract getSearchHelpTextKey(): string;
    protected abstract getTotalLabelKey(): string;
    oninit(vnode: Mithril.Vnode<IPageAttrs, this>): void;
    view(vnode: Mithril.Vnode<IPageAttrs, this>): Mithril.Children;
    headerItems(): ItemList<Mithril.Children>;
    /**
     * Build an item list of common columns to show in each BinPage
     *
     * subclasses should call super.columns() to add their own columns.
     */
    columns(): ItemList<ColumnData<ModelType>>;
    massActions(): ItemList<Mithril.Children>;
    protected isAllSelected(): boolean;
    protected toggleSelectAll(): void;
    protected toggleSelection(e: Event, itemId: string): void;
    protected openItemModal(item: ModelType, action: BinAction): void;
    protected openMassModal(action: BinAction, all?: boolean): void;
    protected refreshAfterChange(): Promise<void>;
    loadPage(pageNumber: number): Promise<void>;
    nextPage(): void;
    previousPage(): void;
    goToPage(page: number): void;
    protected setPageNumberInUrl(pageNumber: number): void;
}
