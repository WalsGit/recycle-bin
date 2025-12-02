import app from 'flarum/admin/app';
import FormModal from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';

export default class MassDeleteDiscussionModal extends FormModal {
  selectedDiscussions!: Set<string>;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.selectedDiscussions = this.attrs.selectedDiscussions;
  }

  className() {
    return 'MassDeleteDiscussionModal Modal--small';
  }

  title() {
    return app.translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <p>
          {app.translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_start')} <strong>{this.selectedDiscussions.size}</strong>{' '}
          {app.translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_end')}
        </p>
        <div className="Form-group">
          {m(
            Button,
            {
              className: 'Button Button--primary Button--block',
              onclick: () => this.onsubmit(),
            },
            app.translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.submit_button')
          )}
        </div>
      </div>
    );
  }

  onsubmit() {
    this.loading = true;

    const promises = Array.from(this.selectedDiscussions).map((discussionId) => {
      return app.store.find('discussions', discussionId).then((discussion) => {
        return discussion.delete();
      });
    });

    Promise.all(promises)
      .then(() => {
        this.hide();
        m.redraw();
        app.alerts.show({ type: 'success' }, app.translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.success'));
        window.location.reload();
      })
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
