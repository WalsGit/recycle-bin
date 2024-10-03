import app from 'flarum/admin/app';
import RecycleBinPage from './components/RecycleBinPage';

app.initializers.add('walsgit/recycle-bin', () => {
  return app.extensionData
    .for('walsgit-recycle-bin')
    .registerPage(RecycleBinPage);
});
