import app from 'flarum/admin/app';
import FormModal from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

export default class DeletePostModal extends FormModal {
  post: any;
  postDeleted: Stream<boolean> | undefined;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.post = vnode.attrs.post;
    this.postDeleted = this.attrs.postDeleted;
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
          {app.translator.trans('walsgit-recycle-bin.admin.delete_post.confirmation')} <strong>{this.post.discussion().title()}</strong> :
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
        if (this.postDeleted) {
          this.postDeleted(true);
        }
        m.redraw();
        app.alerts.show({ type: 'success' }, app.translator.trans('walsgit-recycle-bin.admin.delete_post.success'));
      })
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
