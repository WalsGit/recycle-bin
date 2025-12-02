import Stream from 'flarum/common/utils/Stream';

export interface IFormModalAttrs {
    discussion?: any;
    post?: any;
    discussionDeleted?: Stream<boolean>;
    postDeleted?: Stream<boolean>;
    selectedDiscussions?: Set<string>;
    selectedPosts?: Set<string>;
    discussionRestored?: Stream<boolean>;
    postRestored?: Stream<boolean>;
    [key: string]: any; // Optional: allows for future extension
}