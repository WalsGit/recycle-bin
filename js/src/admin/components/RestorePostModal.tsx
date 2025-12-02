import Form from 'flarum/common/components/Form';
import app from 'flarum/admin/app';
import FormModal from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

export default class RestorePostModal extends FormModal {
  post: any;
  postRestored: Stream<boolean> | undefined;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.post = this.attrs.post;
    this.postRestored = this.attrs.postRestored;
  }

  className() {
    return 'RestorePostModal Modal--small';
  }

  title() {
    return app.translator.trans('walsgit-recycle-bin.admin.restore_post.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <p>
          {app.translator.trans('walsgit-recycle-bin.admin.restore_post.confirmation')} <strong>{this.post.discussion().title()}</strong> :
        </p>
        <pre>
          <code>{this.post.content()}</code>
        </pre>
        <Form className="Form--centered">
          <div className="Form-group">
            {Button.component(
              {
                type: 'submit',
                className: 'Button Button--primary Button--block',
                loading: this.loading,
              },
              app.translator.trans('walsgit-recycle-bin.admin.restore_post.restore_button')
            )}
          </div>
        </Form>
      </div>
    );
  }

  onsubmit(e: Event) {
    e.preventDefault();

    this.loading = true;

    this.post
      .save({ isHidden: false })
      .then(() => {
        this.hide();
        if (this.postRestored) {
          this.postRestored(true);
        }
        m.redraw();
        app.alerts.show({ type: 'success' }, app.translator.trans('walsgit-recycle-bin.admin.restore_post.success'));
      })
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
