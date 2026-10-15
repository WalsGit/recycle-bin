import app from 'flarum/admin/app';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';

interface DeletePostModalAttrs extends IFormModalAttrs {
  post: any;
  onSuccess?: () => void;
}

export default class DeletePostModal extends FormModal<DeletePostModalAttrs> {
  post: any;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.post = vnode.attrs.post;
  }

  className() {
    return 'DeletePostModal Modal--small';
  }

  title() {
    return app.translator.trans('walsgit-recycle-bin.admin.delete_post.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <p>
          {app.translator.trans('walsgit-recycle-bin.admin.delete_post.confirmation', { u: <u></u> })}{' '}
          <strong>{this.post.discussion().title()}</strong> :
        </p>
        <pre>
          <code>{this.post.content()}</code>
        </pre>
        <div className="Form-group">
          {Button.component(
            {
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
            },
            app.translator.trans('walsgit-recycle-bin.admin.delete_post.delete_button')
          )}
        </div>
      </div>
    );
  }

  onsubmit(e: Event) {
    e.preventDefault();

    this.loading = true;

    app
      .request({
        url: `${app.forum.attribute('apiUrl')}/posts/${this.post.id()}`,
        method: 'DELETE',
      })
      .then(() => {
        app.modal.close();
        this.attrs.onSuccess?.();
        m.redraw();
        app.alerts.show({ type: 'success' }, app.translator.trans('walsgit-recycle-bin.admin.delete_post.success'));
      })
      .catch((error) => {
        this.loaded();
        this.onerror(error);
      });
  }
}
