import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
interface MassRestoreDiscussionModalAttrs extends IFormModalAttrs {
    selectedDiscussions: Set<string>;
}
export default class MassRestoreDiscussionModal extends FormModal<MassRestoreDiscussionModalAttrs> {
    selectedDiscussions: Set<string>;
    oninit(vnode: any): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(): void;
}
export {};
