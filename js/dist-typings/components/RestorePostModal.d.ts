import FormModal, { IFormModalAttrs } from 'flarum/common/components/FormModal';
import Stream from 'flarum/common/utils/Stream';
interface RestorePostModalAttrs extends IFormModalAttrs {
    post: any;
    postRestored: Stream<boolean>;
}
export default class RestorePostModal extends FormModal<RestorePostModalAttrs> {
    post: any;
    postRestored: Stream<boolean> | undefined;
    oninit(vnode: any): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(e: Event): void;
}
export {};
