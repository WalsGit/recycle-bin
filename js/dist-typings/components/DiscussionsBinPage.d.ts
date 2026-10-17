import Discussion from 'flarum/common/models/Discussion';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import AbstractBinPage, { ColumnData } from './AbstractBinPage';
import { BinItemType } from './ItemActionModal';
export default class DiscussionsBinPage extends AbstractBinPage<Discussion> {
    protected readonly itemsCount: Stream<number>;
    protected getApiResourceType(): string;
    protected getTitleTranslationKey(): string;
    protected getModelName(): BinItemType;
    protected getSearchPlaceholderKey(): string;
    protected getSearchHelpTextKey(): string;
    protected getTotalLabelKey(): string;
    columns(): ItemList<ColumnData<Discussion>>;
}
