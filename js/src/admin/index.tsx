import app from 'flarum/admin/app';
import SettingsPage from './components/SettingsPage';

export { default as extend } from './extend';

app.initializers.add('walsgit/recycle-bin', () => {
  app.registry.for('walsgit-recycle-bin').registerPage(SettingsPage as any);
});
