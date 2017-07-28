# alias-quokka-plugin
<!-- [![travis][travis.icon]][travis.url] -->
[![package][version.icon] ![downloads][downloads.icon]][package.url]
[![styled with prettier][prettier.icon]][prettier.url]


[Quokka][] plugin for providing module import aliases.

## Usage

Plugin provides a way to define module aliases relative to the project root. Plugin exposes following [quokka settings][]:

```json
{
  "plugins": ["alias-quokka-plugin"],
  "alias": {
      "@": ".",
      "other-thing": "lib/other/thing"
  }
}
```

With above configuration doing `require("@")` will require package itself and `require("other-thing")` will require module under `lib/other/thing` relative to project root.


## Install

You can install it as dev dependency for your package:

### Yarn

    yarn add --save --dev alias-quokka-plugin


### NPM

    npm install --save-dev alias-quokka-plugin

Or install it into [global quokka directory][] as regular dependency.






[travis.icon]: https://travis-ci.org/Gozala/alias-quokka-plugin.svg?branch=master
[travis.url]: https://travis-ci.org/Gozala/alias-quokka-plugin

[version.icon]: https://img.shields.io/npm/v/alias-quokka-plugin.svg
[downloads.icon]: https://img.shields.io/npm/dm/alias-quokka-plugin.svg
[package.url]: https://npmjs.org/package/alias-quokka-plugin


[downloads.image]: https://img.shields.io/npm/dm/alias-quokka-plugin.svg
[downloads.url]: https://npmjs.org/package/alias-quokka-plugin

[prettier.icon]:https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier.url]:https://github.com/prettier/prettier

[Quokka]:https://quokkajs.com/
[Quokka plugin]:https://quokkajs.com/docs/extensibility.html
[global quokka directory]:https://quokkajs.com/docs/configuration.html#global-config-file
[quokka settings]:https://quokkajs.com/docs/configuration.html