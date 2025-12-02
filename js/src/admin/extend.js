import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';

import SettingsPage from './components/SettingsPage'

export default [
    new Extend.Admin()
        .page(SettingsPage)
]