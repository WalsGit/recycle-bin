import Mithril from 'mithril';
import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import Post from 'flarum/common/models/Post';
import User from 'flarum/common/models/User';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import extractText from 'flarum/common/utils/extractText';
import humanTime from 'flarum/common/helpers/humanTime';
import { truncate } from 'flarum/common/utils/string';
import AbstractBinPage from './AbstractBinPage';
import { BinItemType } from './ItemActionModal';

type ColumnData = {
  name: Mithril.Children;
  content: (post: Post) => Mithril.Children;
};

export default class PostsBinPage extends AbstractBinPage<Post> {
  protected readonly itemsCount: Stream<number> = Stream(0);

  protected refreshStatistics(): void {
    app
      .request<{ hidden_posts_count: number }>({
        method: 'GET',
        url: `${app.forum.attribute('apiUrl')}/recycle-bin/post-statistics`,
      })
      .then((result) => {
        this.itemsCount(result.hidden_posts_count);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  protected getApiUrl(): string {
    return 'posts';
  }

  protected getTitleTranslationKey(): string {
    return 'walsgit-recycle-bin.admin.posts_bin';
  }

  protected getModelName(): BinItemType {
    return 'post';
  }

  protected getSearchPlaceholderKey(): string {
    return 'walsgit-recycle-bin.admin.search_post_placeholder';
  }

  protected getSearchHelpTextKey(): string {
    return 'walsgit-recycle-bin.admin.search_post_help_text';
  }

  protected getTotalLabelKey(): string {
    return 'walsgit-recycle-bin.admin.total_hidden_posts';
  }

  columns(): ItemList<ColumnData> {
    const items = new ItemList<ColumnData>();
    const baseUrl = app.forum.attribute('baseUrl') as string;

    items.add(
      'select',
      {
        name: '',
        content: (post: Post) => (
          <input
            type="checkbox"
            className="RecycleBinPage-Checkbox"
            checked={this.selectedIds.has(post.id()!)}
            onchange={(e: Event) => this.toggleSelection(e, post.id()!)}
          />
        ),
      },
      100
    );

    items.add(
      'id',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.post.id'),
        content: (post: Post) => post.id() ?? null,
      },
      99
    );

    items.add(
      'post',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.post.title'),
        content: (post: Post) => {
          const discussion = post.discussion();
          const postUrl = discussion ? `${baseUrl}/d/${discussion.slug()}/${post.number()}` : baseUrl;

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

    items.add(
      'user',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.author'),
        content: (post: Post) => {
          const user = post.user() as User;
          return user && typeof user.displayName === 'function' ? user.displayName() : app.translator.trans('walsgit-recycle-bin.admin.unknown_user');
        },
      },
      85
    );

    items.add(
      'createdAt',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.created_at'),
        content: (post: Post) => (
          <span className="DiscussionList-creationDate" title={post.createdAt() ? String(post.createdAt()) : undefined}>
            {post.createdAt() ? humanTime(post.createdAt() as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}
          </span>
        ),
      },
      80
    );

    items.add(
      'hiddenAt',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.hidden_at'),
        content: (post: Post) => (
          <span className="DiscussionList-hiddenDate" title={post.hiddenAt() ? String(post.hiddenAt()) : undefined}>
            {post.hiddenAt() ? humanTime(post.hiddenAt() as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}
          </span>
        ),
      },
      80
    );

    items.add(
      'actions',
      {
        name: app.translator.trans('walsgit-recycle-bin.admin.actions'),
        content: (post: Post) => [
          m(
            Button,
            {
              className: 'Button DiscussionList-editModalBtn',
              title: extractText(app.translator.trans('walsgit-recycle-bin.admin.restore_post_tooltip', { postId: post.id() })),
              ariaLabel: extractText(app.translator.trans('walsgit-recycle-bin.admin.restore_post_tooltip', { postId: post.id() })),
              onclick: () => this.openItemModal(post, 'restore'),
            },
            <Icon name="fas fa-trash-restore" />
          ),
          m(
            Button,
            {
              className: 'Button DiscussionList-editModalBtn',
              title: extractText(app.translator.trans('walsgit-recycle-bin.admin.delete_post_tooltip', { postId: post.id() })),
              ariaLabel: extractText(app.translator.trans('walsgit-recycle-bin.admin.delete_post_tooltip', { postId: post.id() })),
              onclick: () => this.openItemModal(post, 'delete'),
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
