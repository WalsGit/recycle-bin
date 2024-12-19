import app from 'flarum/admin/app';
import RecycleBinPage from './components/RecycleBinPage';

app.initializers.add('walsgit/recycle-bin', () => {
        app.extensionData
            .for('walsgit-recycle-bin')
            .registerPage(RecycleBinPage as any);
});