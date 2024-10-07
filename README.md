# Recycle Bin

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/walsgit/recycle-bin.svg)](https://packagist.org/packages/walsgit/recycle-bin) [![Total Downloads](https://img.shields.io/packagist/dt/walsgit/recycle-bin.svg)](https://packagist.org/packages/walsgit/recycle-bin)

A [Flarum](http://flarum.org) extension to manage deleted (hidden) discussions.

## Still in development (no release yet) version-0.1.0
### ✅ In this first version you can:
- list all hidden discussions
- restore a hidden discussion (unhide)
- forever delete a hidden discussion (remove from db)
- Mass restore & delete (forever) discussions

### 🐞 Still to fix:
- ~~After restoring or deleting a discussion, the list doesn't update/refresh~~
- Search filter only works with complete words (returns a empty list for partial words) and isn't limited to discussion titles
- ~~Incorrect total number of pages and pagination doesn't work properly~~
- ~~Fix the position of the search filter and the total number of hidden discussions info~~.

### 🔲 Still to implement:
- ~~Mass restoring & deletion functionality~~
- Check permissions

### Notes
- Extention settings page based on the core UserListPage.tsx (Users settings page).


## Installation

Install with composer:

```sh
composer require walsgit/recycle-bin:"*"
```

## Updating

```sh
composer update walsgit/recycle-bin:"*"
php flarum migrate
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/walsgit/recycle-bin)
- [GitHub](https://github.com/walsgit/recycle-bin)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)
