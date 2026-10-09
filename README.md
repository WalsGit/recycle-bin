# Recycle Bin

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/walsgit/recycle-bin.svg)](https://packagist.org/packages/walsgit/recycle-bin) [![Total Downloads](https://img.shields.io/packagist/dt/walsgit/recycle-bin.svg)](https://packagist.org/packages/walsgit/recycle-bin) [![Donate here](https://img.shields.io/badge/donate-here-%23008e97)](https://walsgit.github.io/Donations/)

A [Flarum](https://flarum.org) extension to manage deleted (hidden) discussions and posts.

[![Screenshot](https://i.postimg.cc/y69G3pfp/2024-10-09-16-09-34-flarum-test-baeb96af962a.png)](https://postimg.cc/qgJw9wH2)

## Versions
Starting with the version `2.0.0` of this extension, it will only be compatible with `Flarum v2.*`. Latest version was developed and tested on Flarum version `2.0.0-rc.8`.
`Flarum v1.8.*` will no longer be supported. Last version of the extension compatible with `Flarum v1.8.*` is `walsgit/recycle-bin:"0.2.3"`.

### Features
- listing of all hidden discussions and posts (with direct links, authors, dates + filter through them by keywords)
- restoring hidden discussions or posts
- forever deleting hidden discussions or posts (remove them from db)
- mass restoring or deleting.

### Notes
- This was my very first Flarum extension
- Extension settings page is based on the core UserListPage.tsx (Users settings page) from flarum 1.8.5.
- Developed this with the help of AI (mainly ChatGPT, Gemini & Cody)

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
- [Discuss](https://discuss.flarum.org/d/36073-recycle-bin)
- [Donate](https://walsgit.github.io/Donations/)
