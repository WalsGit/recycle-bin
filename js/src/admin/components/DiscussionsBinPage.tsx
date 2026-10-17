import app from 'flarum/admin/app';
import Discussion from 'flarum/common/models/Discussion';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import AbstractBinPage, { ColumnData } from './AbstractBinPage';
import { BinItemType } from './ItemActionModal';

export default class DiscussionsBinPage extends AbstractBinPage<Discussion> {
  protected readonly itemsCount: Stream<number> = Stream(0);

  protected getApiResourceType(): string {
    return 'discussions';
  }

  protected getTitleTranslationKey(): string {
    return 'walsgit-recycle-bin.admin.discussions_bin';
  }

  protected getModelName(): BinItemType {
    return 'discussion';
  }

  protected getSearchPlaceholderKey(): string {
    return 'walsgit-recycle-bin.admin.search_placeholder';
  }

  protected getSearchHelpTextKey(): string {
    return 'walsgit-recycle-bin.admin.search_help_text';
  }

  protected getTotalLabelKey(): string {
    return 'walsgit-recycle-bin.admin.total_hidden_discussions';
  }

  columns(): ItemList<ColumnData<Discussion>> {
    const items = super.columns();
    const baseUrl = app.forum.attribute('baseUrl') as string;

    items.add(
      'id',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.discussion_id'),
        content: (discussion: Discussion) => discussion.id() ?? null,
      },
      95
    );

    items.add(
      'title',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.discussion_title'),
        content: (discussion: Discussion) => (
          <a href={`${baseUrl}/d/${discussion.id()}`} target="_blank">
            {discussion.title()}
          </a>
        ),
      },
      90
    );

    return items;
  }
}
