import app from 'flarum/admin/app';
import SettingsPage from './components/SettingsPage';

app.initializers.add('walsgit/recycle-bin', () => {
        app.extensionData
            .for('walsgit-recycle-bin')
            .registerPage(SettingsPage as any);
});