import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Stream from 'flarum/common/utils/Stream';
interface DeleteDiscussionModalAttrs extends IFormModalAttrs {
    discussion: any;
    discussionDeleted: Stream<boolean>;
}
export default class DeleteDiscussionModal extends FormModal<DeleteDiscussionModalAttrs> {
    discussion: any;
    discussionDeleted: Stream<boolean> | undefined;
    oninit(vnode: any): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(e: Event): void;
}
export {};
