# Recycle Bin

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/walsgit/recycle-bin.svg)](https://packagist.org/packages/walsgit/recycle-bin) [![Total Downloads](https://img.shields.io/packagist/dt/walsgit/recycle-bin.svg)](https://packagist.org/packages/walsgit/recycle-bin)

A [Flarum](http://flarum.org) extension to manage deleted (hidden) discussions.

[![Screenshot](https://i.postimg.cc/y69G3pfp/2024-10-09-16-09-34-flarum-test-baeb96af962a.png)](https://postimg.cc/qgJw9wH2)

### With Recycle Bin you can:
- list all hidden discussions
- restore a hidden discussion (unhide)
- forever delete a hidden discussion (remove from db)
- Mass restore & delete discussions

### 🐞 Known issues :
- Search filter only works with complete words (returns a empty list for partial words) and isn't limited to discussion titles but also returns discussions where the searched word is found in its messages (replies) too.
- Mass restore or delete need a full page refresh to update de list and total number of hidden discussions (the page refresh is implemented but it's not ideal, you'll have to wait for it after cofirming your mass action)

### Notes
- Developed and tested on Flarum 1.8.5
- Extention settings page is based on the core UserListPage.tsx (Users settings page).
- Developped this with the help of AI (mainly ChatGPT, Cody & Gemini)


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
