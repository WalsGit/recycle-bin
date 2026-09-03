import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
interface MassDeletePostModalAttrs extends IFormModalAttrs {
    selectedPosts: Set<string>;
}
export default class MassDeletePostModal extends FormModal<MassDeletePostModalAttrs> {
    selectedPosts: Set<string>;
    oninit(vnode: any): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(): void;
}
export {};
