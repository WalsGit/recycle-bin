import app from 'flarum/admin/app';
import Post from 'flarum/common/models/Post';
import ItemList from 'flarum/common/utils/ItemList';
import Stream from 'flarum/common/utils/Stream';
import { truncate } from 'flarum/common/utils/string';
import AbstractBinPage, { ColumnData } from './AbstractBinPage';
import { BinItemType } from './ItemActionModal';

export default class PostsBinPage extends AbstractBinPage<Post> {
  protected readonly itemsCount: Stream<number> = Stream(0);

  protected getApiResourceType(): string {
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

  columns(): ItemList<ColumnData<Post>> {
    const items = super.columns();
    const baseUrl = app.forum.attribute('baseUrl') as string;

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

    return items;
  }
}
