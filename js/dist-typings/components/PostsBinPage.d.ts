import Post from 'flarum/common/models/Post';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import AbstractBinPage, { ColumnData } from './AbstractBinPage';
import { BinItemType } from './ItemActionModal';
export default class PostsBinPage extends AbstractBinPage<Post> {
    protected readonly itemsCount: Stream<number>;
    protected getApiResourceType(): string;
    protected getTitleTranslationKey(): string;
    protected getModelName(): BinItemType;
    protected getSearchPlaceholderKey(): string;
    protected getSearchHelpTextKey(): string;
    protected getTotalLabelKey(): string;
    columns(): ItemList<ColumnData<Post>>;
}
