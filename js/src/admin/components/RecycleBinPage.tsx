import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Discussion from 'flarum/common/models/Discussion';
import User from 'flarum/common/models/User';
import username from 'flarum/common/helpers/username';
import humanTime from 'flarum/common/helpers/humanTime';
import { ComponentAttrs } from 'flarum/common/Component'; // Import pour typer les attributs des composants
import type Mithril from 'mithril'; // Typing pour Mithril

export default class RecycleBinPage extends ExtensionPage {
    hiddenDiscussions: Discussion[] = [];
    rowIndex = 2;

    oninit(vnode: Mithril.Vnode<ComponentAttrs, this>) {
        super.oninit(vnode);

        // Charger toutes les discussions depuis l'API et filtrer celles qui sont cachées
        app.store.find('discussions').then((discussions: any) => {
            this.hiddenDiscussions = discussions.filter((discussion: Discussion) => discussion.isHidden());
            m.redraw(); // Forcer le rendu après que les données ont été récupérées
        });
    }

    content() {
        return (
            <div className='container'>
                <div className="RecycleBinPage-header">
                    <h3>{app.translator.trans('walsgit-recycle-bin.admin.title')}</h3>
                    <div className="search-input">
                        <input className="FormControl SearchBar" type="search" placeholder={app.translator.trans('walsgit-recycle-bin.admin.search_placeholder')} />
                        <p className="RecycleBinPage-totalDiscussions">
                            {app.translator.trans('walsgit-recycle-bin.admin.total_discussions', { count: this.hiddenDiscussions.length })}
                        </p>
                    </div>
                </div>

                <section className="RecycleBinPage-grid RecycleBinPage-grid--loaded" role="table" aria-rowcount={this.hiddenDiscussions.length + 1} aria-colcount="7" aria-live="polite" aria-busy="false" style="--columns: 7;">

                    <div className="RecycleBinPage-grid-header" role="columnheader" aria-colindex="1" aria-rowindex="1"></div>
                    <div className="RecycleBinPage-grid-header" role="columnheader" aria-colindex="2" aria-rowindex="1">{app.translator.trans('walsgit-recycle-bin.admin.discussion_id')}</div>
                    <div className="RecycleBinPage-grid-header" role="columnheader" aria-colindex="3" aria-rowindex="1">{app.translator.trans('walsgit-recycle-bin.admin.discussion_title')}</div>
                    <div className="RecycleBinPage-grid-header" role="columnheader" aria-colindex="4" aria-rowindex="1">{app.translator.trans('walsgit-recycle-bin.admin.discussion_author')}</div>
                    <div className="RecycleBinPage-grid-header" role="columnheader" aria-colindex="5" aria-rowindex="1">{app.translator.trans('walsgit-recycle-bin.admin.created_at')}</div>
                    <div className="RecycleBinPage-grid-header" role="columnheader" aria-colindex="6" aria-rowindex="1">{app.translator.trans('walsgit-recycle-bin.admin.hidden_at')}</div>
                    <div className="RecycleBinPage-grid-header" role="columnheader" aria-colindex="7" aria-rowindex="1">{app.translator.trans('walsgit-recycle-bin.admin.actions')}</div>

                    {this.hiddenDiscussions.length > 0 ? (
                        this.hiddenDiscussions.map((discussion) => {
                            const rowIndex = this.rowIndex;
                            this.rowIndex += 1;
                            return (
                                <>
                                <div className="RecycleBinPage-grid-rowItem" data-discussion-id={discussion.id()} data-column-name="" aria-colindex="1" aria-rowindex={rowIndex} role="cell"></div>
                                
                                <div className="RecycleBinPage-grid-rowItem" data-discussion-id={discussion.id()} data-column-name="" aria-colindex="2" aria-rowindex={rowIndex} role="cell">{discussion.id()}</div>

                                <div className="RecycleBinPage-grid-rowItem" data-discussion-id={discussion.id()} data-column-name="" aria-colindex="3" aria-rowindex={rowIndex} role="cell">{discussion.title()}</div>

                                <div className="RecycleBinPage-grid-rowItem" data-discussion-id={discussion.id()} data-column-name="" aria-colindex="4" aria-rowindex={rowIndex} role="cell">{username(discussion.user() as User)}</div>

                                <div className="RecycleBinPage-grid-rowItem" data-discussion-id={discussion.id()} data-column-name="" aria-colindex="5" aria-rowindex={rowIndex} role="cell">{discussion.createdAt() ? humanTime(discussion.createdAt() as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}</div>


                                <div className="RecycleBinPage-grid-rowItem" data-discussion-id={discussion.id()} data-column-name="" aria-colindex="6" aria-rowindex={rowIndex} role="cell">{discussion.hiddenAt() ? humanTime(discussion.hiddenAt() as Date) : app.translator.trans('walsgit-recycle-bin.admin.unknown_date')}</div>
                                
                                <div className="RecycleBinPage-grid-rowItem" data-discussion-id={discussion.id()} data-column-name="actions" aria-colindex="7" aria-rowindex={rowIndex} role="cell">test</div>
                                </>                                
                            );
                        })
                    ) : (
                        <div className="RecycleBinPage-grid-rowItem--empty" aria-colindex="1" aria-rowindex="2" role="cell">
                            <em>{app.translator.trans('walsgit-recycle-bin.admin.empty_list')}</em>
                        </div>
                    )}

                </section>

            </div>
        );
    }
}
