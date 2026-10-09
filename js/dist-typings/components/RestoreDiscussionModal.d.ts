import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Stream from 'flarum/common/utils/Stream';
interface RestoreDiscussionModalAttrs extends IFormModalAttrs {
    discussion: any;
    discussionRestored: Stream<boolean>;
}
export default class RestoreDiscussionModal extends FormModal<RestoreDiscussionModalAttrs> {
    discussion: any;
    discussionRestored: Stream<boolean> | undefined;
    oninit(vnode: any): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(e: Event): void;
}
export {};
