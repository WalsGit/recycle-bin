# Recycle Bin

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/walsgit/recycle-bin.svg)](https://packagist.org/packages/walsgit/recycle-bin) [![Total Downloads](https://img.shields.io/packagist/dt/walsgit/recycle-bin.svg)](https://packagist.org/packages/walsgit/recycle-bin) [![Donate here](https://img.shields.io/badge/donate-here-%23008e97)](https://walsgit.github.io/Donations/)

A [Flarum](https://flarum.org) extension to manage deleted (hidden) discussions and posts.

## Screenshots

**Discussions bin**

![Discussions bin](https://i.postimg.cc/D0phRgn1/recycle-bin-discussions.png)

**Posts bin**

![Posts bin](https://i.postimg.cc/m2qRw8m9/recycle-bin-posts.png)

**Settings**

![Settings](https://i.postimg.cc/K8MbsBVm/recycle-bin-settings.png)

## Versions
Starting with the version `2.0.0` of this extension, it will only be compatible with `Flarum v2.*`. Latest version was developed on Flarum version `2.0.2`, and its automated tests run against MySQL, MariaDB, PostgreSQL and SQLite.
`Flarum v1.8.*` will no longer be supported. Last version of the extension compatible with `Flarum v1.8.*` is `walsgit/recycle-bin:"0.2.3"`.

### Features
- listing of all hidden discussions and posts (with direct links, authors, dates + filter through them by keywords)
- restoring hidden discussions or posts
- forever deleting hidden discussions or posts (remove them from db)
- mass restoring or deleting a selection, or deleting everything in the bin
- optional log of permanent deletions.

### Permissions and limits
- The recycle bin is **admin-only**: the extension checks that the user is an administrator rather than relying on a configurable permission, and its listing, search and mass action endpoints refuse everybody else.
- Only hidden items are processed. Posts are limited to hidden comments (event posts such as "renamed the discussion" are ignored).
- Restoring and deleting go through the Flarum core events, so discussion and user counters stay accurate and other extensions are notified.
- Mass actions on a selection are limited to 100 items per request, processed in chunks of 50.
- "Delete all" processes at most 200 items per request; the interface sends as many requests as needed and shows a progress counter. Only the items that were hidden when the list was loaded are processed: items hidden since then (by another admin, for example) are left alone. This cut-off date is sent in UTC.

### Deletion log
Permanent deletions can be logged, which is useful on forums with several administrators. It is **disabled by default**; enable it in the "Settings" tab of the extension.

- Logs are written to `storage/logs/recycle-bin/recycle-bin-deletions-YYYY-MM-DD.log`, one file per day of activity. Only the 15 most recent files are kept, older ones are removed automatically (no cron job or queue is needed).
- Each deletion of a single item is one line (who, what, when). A mass deletion is one summary line (who, type, number of items, selected ids or "all"). The content of posts is never logged.

  ```
  [2026-11-05 19:21:40] recycle-bin.INFO: discussion deleted {"actor_id":1,"actor_username":"admin","id":42,"title":"..."}
  ```
- A problem while writing the log never blocks a deletion: it is reported in the regular Flarum log instead.

### Notes
- This was my very first Flarum extension
- Extension settings page is based on the core UserListPage.tsx (Users settings page) from flarum 1.8.5.
- Developed this with the help of AI (mainly Claude, ChatGPT & Gemini)

## Installation

Install with composer:

```sh
composer require walsgit/recycle-bin:"*"
```

## Updating

```sh
composer update walsgit/recycle-bin:"*"
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/walsgit/recycle-bin)
- [GitHub](https://github.com/walsgit/recycle-bin)
- [Discuss](https://discuss.flarum.org/d/36073-recycle-bin)
- [Donate](https://walsgit.github.io/Donations/)
