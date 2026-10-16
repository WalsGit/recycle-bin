import Mithril from 'mithril';
import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import Discussion from 'flarum/common/models/Discussion';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import extractText from 'flarum/common/utils/extractText';
import humanTime from 'flarum/common/helpers/humanTime';
import AbstractBinPage from './AbstractBinPage';
import { BinItemType } from './ItemActionModal';

type ColumnData = {
  name: Mithril.Children;
  content: (discussion: Discussion) => Mithril.Children;
};

export default class DiscussionsBinPage extends AbstractBinPage<Discussion> {
  protected readonly itemsCount: Stream<number> = Stream(0);

  protected refreshStatistics(): void {
    app
      .request<{ hidden_discussions_count: number }>({
        method: 'GET',
        url: `${app.forum.attribute('apiUrl')}/recycle-bin/discussion-statistics`,
      })
      .then((result) => {
        this.itemsCount(result.hidden_discussions_count);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  protected getApiUrl(): string {
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

  columns(): ItemList<ColumnData> {
    const items = new ItemList<ColumnData>();
    const baseUrl = app.forum.attribute('baseUrl') as string;

    items.add(
      'select',
      {
        name: '',
        content: (discussion: Discussion) => (
          <input
            type="checkbox"
            className="RecycleBinPage-Checkbox"
            checked={this.selectedIds.has(discussion.id()!)}
            onchange={(e: Event) => this.toggleSelection(e, discussion.id()!)}
          />
        ),
      },
      100
    );

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

    items.add(
      'user',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.author'),
        content: (discussion: Discussion) => {
          const user = discussion.user();
          return user ? (
            <a href={`${baseUrl}/u/${user.id()}`} target="_blank">
              {user.displayName()}
            </a>
          ) : (
            app.translator.trans('walsgit-recycle-bin.admin.unknown_user')
          );
        },
      },
      80
    );

    items.add(
      'createdAt',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.created_at'),
        content: (discussion: Discussion) => {
          const createdAt = discussion.createdAt();
          return (
            <span className="DiscussionList-creationDate" title={createdAt ? String(createdAt) : undefined}>
              {createdAt ? humanTime(createdAt as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}
            </span>
          );
        },
      },
      75
    );

    items.add(
      'hidden_at',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.hidden_at'),
        content: (discussion: Discussion) => {
          const hiddenAt = discussion.hiddenAt();
          return (
            <span className="DiscussionList-hiddenDate" title={hiddenAt ? String(hiddenAt) : undefined}>
              {hiddenAt ? humanTime(hiddenAt as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}
            </span>
          );
        },
      },
      70
    );

    items.add(
      'actions',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.actions'),
        content: (discussion: Discussion) => [
          m(
            Button,
            {
              className: 'Button DiscussionList-editModalBtn',
              title: extractText(app.translator.trans('walsgit-recycle-bin.admin.restore_discussion_tooltip', { discussionId: discussion.id() })),
              ariaLabel: extractText(app.translator.trans('walsgit-recycle-bin.admin.restore_discussion_tooltip', { discussionId: discussion.id() })),
              onclick: () => this.openItemModal(discussion, 'restore'),
            },
            <Icon name="fas fa-trash-restore" />
          ),
          m(
            Button,
            {
              className: 'Button DiscussionList-editModalBtn',
              title: extractText(app.translator.trans('walsgit-recycle-bin.admin.delete_tooltip', { discussionId: discussion.id() })),
              ariaLabel: extractText(app.translator.trans('walsgit-recycle-bin.admin.delete_tooltip', { discussionId: discussion.id() })),
              onclick: () => this.openItemModal(discussion, 'delete'),
            },
            <Icon name="fas fa-times" />
          ),
        ],
      },
      -90
    );

    return items;
  }
}
