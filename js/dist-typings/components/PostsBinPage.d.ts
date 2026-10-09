import Page, { IPageAttrs } from 'flarum/common/components/Page';
import Mithril from 'mithril';
import Post from 'flarum/common/models/Post';
import ItemList from 'flarum/common/utils/ItemList';
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
    private query;
    private throttledSearch;
    private postRestored;
    private postDeleted;
    private hiddenPostsCount;
    /**
     * Number of discussions to load per page.
     */
    private numPerPage;
    /**
     * Current page number. Zero-indexed.
     */
    private pageNumber;
    /**
     * Page number being loaded. Zero-indexed.
     */
    private loadingPageNumber;
    /**
     * Get total number of hidden discussion pages.
     */
    private getTotalPageCount;
    /**
     * This page's array of discussions.
     *
     * `undefined` when page loads as no data has been fetched.
     */
    private pageData;
    /**
     * Are there more hidden discussions available?
     */
    private moreData;
    private isLoadingPage;
    /**
     * Tracking which discussions have been selected for mass actions.
     */
    private selectedPosts;
    private togglePostSelection;
    oninit(vnode: Mithril.Vnode<IPageAttrs, this>): void;
    /**
     * Component to render.
     */
    view(vnode: Mithril.Vnode<IPageAttrs, this>): Mithril.Children;
    headerItems(): ItemList<Mithril.Children>;
    /**
     * Build an item list of columns to show for each hidden discussion.
     *
     * Each column in the list should be an object with keys `name` and `content`.
     *
     * `name` is a string that will be used as the column name.
     * `content` is a function with the Discussion model passed as the first and only argument.
     */
    columns(): ItemList<ColumnData>;
    /**
     * Build an item list of mass actions buttons to show under the hidden discussions list.
     */
    massActions(): ItemList<Mithril.Children>;
    /**
     * Asynchronously fetch the next set of hidden discussions to be rendered.
     *
     * Returns an array of Discussions, plus the raw API payload.
     *
     * Uses the `this.numPerPage` as the response limit, and automatically calculates the offset required from `pageNumber`.
     *
     * @param pageNumber The **zero-based** page number to load and display
     */
    loadPage(pageNumber: number): Promise<void>;
    nextPage(): void;
    previousPage(): void;
    /**
     * @param page The **1-based** page number
     */
    goToPage(page: number): void;
    private setPageNumberInUrl;
}
export {};
