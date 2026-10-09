import app from 'flarum/admin/app';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';

interface MassRestorePostModalAttrs extends IFormModalAttrs {
  selectedPosts: Set<string>;
}

export default class MassRestorePostModal extends FormModal<MassRestorePostModalAttrs> {
  selectedPosts!: Set<string>;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.selectedPosts = vnode.attrs.selectedPosts;
  }

  className() {
    return 'MassRestorePostModal Modal--small';
  }

  title() {
    return app.translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <p>
          {app.translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.text_start')} <strong>{this.selectedPosts.size}</strong>{' '}
          {app.translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.text_end')}
        </p>
        <div className="Form-group">
          {m(
            Button,
            {
              className: 'Button Button--primary Button--block',
              onclick: () => this.onsubmit(),
            },
            app.translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.submit_button')
          )}
        </div>
      </div>
    );
  }
  onsubmit() {
    this.loading = true;

    app
      .request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/recycle-bin/mass-posts`,
        body: {
          action: 'restore',
          ids: Array.from(this.selectedPosts),
        },
      })
      .then(() => {
        this.hide();
        if (this.attrs.onSuccess) {
          this.attrs.onSuccess();
        }
        m.redraw();
        app.alerts.show({ type: 'success' }, app.translator.trans('walsgit-recycle-bin.admin.mass_restore_post_modal.success'));
      })
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
