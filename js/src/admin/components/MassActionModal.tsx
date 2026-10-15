import app from 'flarum/admin/app';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import type { BinAction, BinItemType } from './ItemActionModal';

interface MassActionModalAttrs extends IFormModalAttrs {
  selectedIds: Set<string>;
  type: BinItemType;
  action: BinAction;
  onSuccess?: () => void;
}

export default class MassActionModal extends FormModal<MassActionModalAttrs> {
  private get translationPrefix(): string {
    const { action, type } = this.attrs;
    const suffix = type === 'post' ? '_post' : '';

    return `walsgit-recycle-bin.admin.mass_${action}${suffix}_modal`;
  }

  className() {
    return 'MassActionModal Modal--small';
  }

  title() {
    return app.translator.trans(`${this.translationPrefix}.title`);
  }

  content() {
    return (
      <div className="Modal-body">
        <p>
          {app.translator.trans(`${this.translationPrefix}.text_start`, { u: <u></u> })} <strong>{this.attrs.selectedIds.size}</strong>{' '}
          {app.translator.trans(`${this.translationPrefix}.text_end`)}
        </p>
        <div className="Form-group">
          {m(
            Button,
            {
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
            },
            app.translator.trans(`${this.translationPrefix}.submit_button`)
          )}
        </div>
      </div>
    );
  }

  onsubmit(e: Event) {
    e.preventDefault();

    this.loading = true;

    const { type, action, selectedIds } = this.attrs;

    app
      .request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/recycle-bin/mass-${type}s`,
        body: {
          action,
          type: `${type}s`,
          ids: Array.from(selectedIds),
        },
      })
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
