import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import type { BinAction, BinItemType } from './ItemActionModal';
interface MassActionModalAttrs extends IFormModalAttrs {
    selectedIds: Set<string>;
    type: BinItemType;
    action: BinAction;
    all?: boolean;
    totalCount?: number;
    onSuccess?: () => void;
}
export default class MassActionModal extends FormModal<MassActionModalAttrs> {
    private get translationPrefix();
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(e: Event): void;
}
export {};
