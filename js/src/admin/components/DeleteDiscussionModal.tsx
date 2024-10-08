import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

export default class DeleteDiscussionModal extends Modal {
    discussion: any;
    discussionDeleted: Stream<boolean>; 

    oninit(vnode: any) {
    super.oninit(vnode);
    this.discussion = vnode.attrs.discussion;
    this.discussionDeleted = this.attrs.discussionDeleted; 
    }

    className() {
    return 'DeleteDiscussionModal Modal--small';
    }

    title() {
    return app.translator.trans('walsgit-recycle-bin.admin.delete_discussion.title');
    }

    content() {
    return (
        <div className="Modal-body">
            <p>{app.translator.trans('walsgit-recycle-bin.admin.delete_discussion.confirmation')} <strong>{this.discussion.title()}</strong></p>
            <div className="Form-group">
                {Button.component(
                {
                    className: 'Button Button--primary Button--block',
                    type: 'submit',
                    loading: this.loading,
                },
                app.translator.trans('walsgit-recycle-bin.admin.delete_discussion.delete_button')
                )}
            </div>
        </div>
    );
    }

    onsubmit(e: Event) {
        e.preventDefault();

        this.loading = true;

        app.request({
            url: `${app.forum.attribute('apiUrl')}/discussions/${this.discussion.id()}`,
            method: 'DELETE',
        })
        .then(() => {
            app.modal.close();
            this.discussionDeleted(true); 
            m.redraw();
            app.alerts.show(
                { type: 'success' },
                app.translator.trans('walsgit-recycle-bin.admin.delete_discussion.success')
            );
        })
        .catch(() => {
            this.loading = false;
            m.redraw();
        });
    }
}
