import app from 'flarum/admin/app';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';

export type BinItemType = 'discussion' | 'post';
export type BinAction = 'restore' | 'delete';

interface ItemActionModalAttrs extends IFormModalAttrs {
  item: any;
  type: BinItemType;
  action: BinAction;
  onSuccess?: () => void;
}

export default class ItemActionModal extends FormModal<ItemActionModalAttrs> {
  private get translationPrefix(): string {
    return `walsgit-recycle-bin.admin.${this.attrs.action}_${this.attrs.type}`;
  }

  className() {
    return 'ItemActionModal Modal--small';
  }

  title() {
    return app.translator.trans(`${this.translationPrefix}.title`);
  }

  content() {
    const { item, type, action } = this.attrs;
    const isPost = type === 'post';
    const discussionTitle = isPost ? item.discussion()?.title() : item.title();

    return (
      <div className="Modal-body">
        <p>
          {app.translator.trans(`${this.translationPrefix}.confirmation`, { u: <u></u> })} <strong>{discussionTitle}</strong>
          {isPost ? ' :' : ''}
        </p>
        {isPost && (
          <pre>
            <code>{item.content()}</code>
          </pre>
        )}
        <div className="Form-group">
          {m(
            Button,
            {
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
            },
            app.translator.trans(`${this.translationPrefix}.${action}_button`)
          )}
        </div>
      </div>
    );
  }

  onsubmit(e: Event) {
    e.preventDefault();

    this.loading = true;

    const { item, type, action } = this.attrs;

    const request =
      action === 'restore'
        ? item.save({ isHidden: false })
        : app.request({
            url: `${app.forum.attribute('apiUrl')}/${type}s/${item.id()}`,
            method: 'DELETE',
          });

    request
      .then(() => {
        this.hide();
        this.attrs.onSuccess?.();
        m.redraw();
        app.alerts.show({ type: 'success' }, app.translator.trans(`${this.translationPrefix}.success`));
      })
      .catch((error: any) => {
        this.loaded();
        this.onerror(error);
      });
  }
}
