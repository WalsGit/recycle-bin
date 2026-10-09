import FormModal from 'flarum/common/components/FormModal';
import Stream from 'flarum/common/utils/Stream';
export default class DeletePostModal extends FormModal {
    post: any;
    postDeleted: Stream<boolean> | undefined;
    oninit(vnode: any): void;
    className(): string;
    title(): string | any[];
    content(): JSX.Element;
    onsubmit(e: Event): void;
}
