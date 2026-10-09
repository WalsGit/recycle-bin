import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
interface MassRestorePostModalAttrs extends IFormModalAttrs {
    selectedPosts: Set<string>;
    onSuccess?: () => void;
}
export default class MassRestorePostModal extends FormModal<MassRestorePostModalAttrs> {
    selectedPosts: Set<string>;
    oninit(vnode: any): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(): void;
}
export {};
