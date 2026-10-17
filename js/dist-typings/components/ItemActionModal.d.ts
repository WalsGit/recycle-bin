import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
export type BinItemType = 'discussion' | 'post';
export type BinAction = 'restore' | 'delete';
interface ItemActionModalAttrs extends IFormModalAttrs {
    item: any;
    type: BinItemType;
    action: BinAction;
    onSuccess?: () => void;
}
export default class ItemActionModal extends FormModal<ItemActionModalAttrs> {
    private get translationPrefix();
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(e: Event): void;
}
export {};
