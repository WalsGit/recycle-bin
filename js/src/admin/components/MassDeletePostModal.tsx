import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class MassDeletePostModal extends Modal {
  selectedPosts!: Set<string>;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.selectedPosts = this.attrs.selectedPosts;
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
          {app.translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_start')} <strong>{this.selectedPosts.size}</strong>{' '}
          {app.translator.trans('walsgit-recycle-bin.admin.mass_delete_modal.text_end')}
        </p>
        <div className="Form-group">
          {m(
            Button,
            {
              className: 'Button Button--primary Button--block',
              onclick: () => this.onsubmit(),
            },
            app.translator.trans('walsgit-recycle-bin.admin.mass_delete_post_modal.submit_button')
          )}
        </div>
      </div>
    );
  }

  onsubmit() {
    this.loading = true;

    const promises = Array.from(this.selectedPosts).map((postId) => {
      return app.store.find('posts', postId).then((post) => {
        return post.delete();
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
