import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class MassRestoreDiscussionModal extends Modal {
    selectedDiscussions!: Set<string>;

    oninit(vnode: any) {
        super.oninit(vnode);
        this.selectedDiscussions = this.attrs.selectedDiscussions;
    }

    className() {
        return 'MassRestoreDiscussionModal Modal--small';
    }

    title() {
        return app.translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.title');
    }

    content() {
        return (
            console.log(this.selectedDiscussions.size),
            <div className="Modal-body">
                <p>
                {app.translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.text_start')} <strong>{this.selectedDiscussions.size}</strong> {app.translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.text_end')}
                </p>
                <div className="Form-group">
                <Button className="Button Button--primary" onclick={() => this.onsubmit()}>
                    {app.translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.submit_button')}
                </Button>
                </div>
            </div>
        );
    }

    onsubmit() {
        this.loading = true;

        const promises = Array.from(this.selectedDiscussions).map(discussionId => {
            return app.store.find('discussions', discussionId).then(discussion => {
                return discussion.save({ isHidden: false });
            });
        });

        Promise.all(promises)
            .then(() => {
                this.hide();
                m.redraw();
                app.alerts.show(
                    { type: 'success' },
                    app.translator.trans('walsgit-recycle-bin.admin.mass_restore_modal.success')
                );
                // Optionally, you can emit an event or call a function to refresh the RecycleBinPage
            })
            .catch(() => {
                this.loading = false;
                m.redraw();
            });
    }
}
