import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
interface MassDeleteDiscussionModalAttrs extends IFormModalAttrs {
    selectedDiscussions: Set<string>;
    onSuccess?: () => void;
}
export default class MassDeleteDiscussionModal extends FormModal<MassDeleteDiscussionModalAttrs> {
    selectedDiscussions: Set<string>;
    oninit(vnode: any): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(): void;
}
export {};
