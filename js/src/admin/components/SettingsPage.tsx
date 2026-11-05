import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import Form from 'flarum/common/components/Form';
import DiscussionsBinPage from './DiscussionsBinPage';
import PostsBinPage from './PostsBinPage';

export default class SettingsPage extends ExtensionPage {
  content() {
    const bin = m.route.param().bin || 'discussions-bin';

    return (
      <div className="ExtensionPage-settings RecycleBin">
        <div className="RecycleBin-menu">
          <div className="container">{this.menuButtons(bin)}</div>
        </div>

        <div className="container RecycleBin-container">{this.pageContent(bin)}</div>
      </div>
    );
  }

  // Return button menus
  menuButtons(bin: string) {
    return [
      Button.component(
        {
          className: `Button ${bin === 'discussions-bin' ? 'item-selected' : ''}`,
          onclick: () =>
            m.route.set(
              app.route('extension', {
                id: 'walsgit-recycle-bin',
                bin: 'discussions-bin',
                page: 1,
              })
            ),
          icon: 'fas fa-comment',
        },
        app.translator.trans('walsgit-recycle-bin.admin.discussions_bin')
      ),
      Button.component(
        {
          className: `Button ${bin === 'posts-bin' ? 'item-selected' : ''}`,
          onclick: () =>
            m.route.set(
              app.route('extension', {
                id: 'walsgit-recycle-bin',
                bin: 'posts-bin',
                page: 1,
              })
            ),
          icon: 'far fa-comment-dots',
        },
        app.translator.trans('walsgit-recycle-bin.admin.posts_bin')
      ),
      Button.component(
        {
          className: `Button ${bin === 'settings-tab' ? 'item-selected' : ''}`,
          onclick: () =>
            m.route.set(
              app.route('extension', {
                id: 'walsgit-recycle-bin',
                bin: 'settings-tab',
              })
            ),
          icon: 'fas fa-cog',
        },
        app.translator.trans('walsgit-recycle-bin.admin.settings_tab')
      ),
    ];
  }

  pageContent(bin: string) {
    if (bin === 'posts-bin') {
      return <PostsBinPage />;
    }
    if (bin === 'settings-tab') {
      return this.settingsContent();
    }
    // Default Discussions bin
    return <DiscussionsBinPage />;
  }

  settingsContent() {
    return (
      <div className="ExtensionPage-settings">
        <h2>{app.translator.trans('walsgit-recycle-bin.admin.settings_title')}</h2>
        <Form>
          {this.buildSettingComponent({
            type: 'boolean',
            setting: 'walsgit-recycle-bin.deletion_log',
            label: app.translator.trans('walsgit-recycle-bin.admin.deletion_log_label'),
            help: app.translator.trans('walsgit-recycle-bin.admin.deletion_log_help'),
          })}
          <div className="Form-group Form-controls">{this.submitButton()}</div>
        </Form>
      </div>
    );
  }
}
