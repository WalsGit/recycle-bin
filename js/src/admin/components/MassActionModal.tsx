import app from 'flarum/admin/app';
import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import type { BinAction, BinItemType } from './ItemActionModal';

interface MassActionModalAttrs extends IFormModalAttrs {
  selectedIds: Set<string>;
  type: BinItemType;
  action: BinAction;
  all?: boolean;
  totalCount?: number;
  /** Server time of the counts shown, required by "all" mode (see AbstractBinPage) */
  hiddenBefore?: string;
  onSuccess?: () => void;
}

export default class MassActionModal extends FormModal<MassActionModalAttrs> {
  private processedCount: number = 0;
  // Total refreshed while processing, the count given when opening the modal can become outdated
  private refreshedTotal?: number;

  private get total(): number | undefined {
    return this.refreshedTotal ?? this.attrs.totalCount;
  }

  private get translationPrefix(): string {
    const { action, type, all } = this.attrs;
    const suffix = type === 'post' ? '_post' : '';

    return `walsgit-recycle-bin.admin.mass_${action}${all ? '_all' : ''}${suffix}_modal`;
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
          {app.translator.trans(`${this.translationPrefix}.text_start`, { u: <u></u> })}{' '}
          <strong>{this.attrs.all ? this.attrs.totalCount : this.attrs.selectedIds.size}</strong>{' '}
          {app.translator.trans(`${this.translationPrefix}.text_end`)}
        </p>
        {this.attrs.all && this.loading && (
          <p className="MassActionModal-progress">
            {app.translator.trans('walsgit-recycle-bin.admin.mass_progress', {
              processed: this.processedCount,
              total: this.total,
            })}
          </p>
        )}
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

    void this.processMassAction();
  }

  private async processMassAction(): Promise<void> {
    this.loading = true;
    this.processedCount = 0;
    this.refreshedTotal = undefined;

    const { type, action, selectedIds, all, hiddenBefore } = this.attrs;
    let processedAny = false;

    try {
      let hasMore = false;

      do {
        // Batches must run one after the other: processed items leave the bin, so the next batch depends on the previous one
        // eslint-disable-next-line no-await-in-loop
        const result = await app.request<{ processed_count: number; has_more: boolean; remaining_count: number }>({
          method: 'POST',
          url: `${app.forum.attribute('apiUrl')}/recycle-bin/mass-${type}s`,
          body: {
            action,
            ...(all ? { all: true, hidden_before: hiddenBefore } : { ids: Array.from(selectedIds) }),
          },
        });

        if (result.processed_count > 0) processedAny = true;

        this.processedCount += result.processed_count;

        // The bin can change while processing: base the total on what is left rather than on the count at opening
        if (result.has_more) this.refreshedTotal = this.processedCount + result.remaining_count;

        m.redraw();

        // Stop when nothing was processed, to avoid an infinite loop
        hasMore = result.has_more && result.processed_count > 0;
      } while (hasMore);

      this.hide();
      this.attrs.onSuccess?.();
      m.redraw();

      if (this.processedCount === 0) {
        // Items were already restored or deleted (for example from another tab)
        app.alerts.show({ type: 'warning' }, app.translator.trans('walsgit-recycle-bin.admin.mass_nothing_to_process'));
      } else {
        app.alerts.show({ type: 'success' }, app.translator.trans(`${this.translationPrefix}.success`));
      }
    } catch (error: any) {
      this.loaded();
      this.onerror(error);

      if (processedAny) {
        app.alerts.show(
          { type: 'warning' },
          app.translator.trans('walsgit-recycle-bin.admin.mass_partial_failure', { processed: this.processedCount })
        );
      }

      // The server may have processed part of the items before failing: always refresh the list
      this.attrs.onSuccess?.();
    }
  }
}
