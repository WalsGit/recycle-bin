import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

export default class RestoreDiscussionModal extends Modal {
    discussion: any;
    discussionRestored: Stream<boolean>; 

    oninit(vnode: any) {
    super.oninit(vnode);
    this.discussion = this.attrs.discussion;
    this.discussionRestored = this.attrs.discussionRestored; 
    }

    className() {
    return 'RestoreDiscussionModal Modal--small';
    }

    title() {
    return app.translator.trans('walsgit-recycle-bin.admin.restore_discussion.title');
    }

    content() {
    return (
        <div className="Modal-body">
        <p>{app.translator.trans('walsgit-recycle-bin.admin.restore_discussion.confirmation')} <strong>{this.discussion.title()}</strong></p>
        <div className="Form Form--centered">
            <div className="Form-group">
            {Button.component(
                {
                type: 'submit',
                className: 'Button Button--primary Button--block',
                loading: this.loading,
                },
                app.translator.trans('walsgit-recycle-bin.admin.restore_discussion.restore_button')
            )}
            </div>
        </div>
        </div>
    );
    }

    onsubmit(e: Event) {
        e.preventDefault();

        this.loading = true;

        this.discussion
            .save({ isHidden: false })
            .then(() => {
                this.hide();
                this.discussionRestored(true); 
                m.redraw();
                app.alerts.show(
                    { type: 'success' },
                    app.translator.trans('walsgit-recycle-bin.admin.restore_discussion.success')
                );
            })
            .catch(() => {
                this.loading = false;
                m.redraw();
            });
    }
}
