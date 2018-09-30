# Alias Quokka Plugin

<!-- [![travis][travis.icon]][travis.url] -->
[![package][version.icon] ![downloads][downloads.icon]][package.url]
[![styled with prettier][prettier.icon]][prettier.url]

## Abstract

Alias Quokka Plugin is a [Quokka][] plugin for providing module import aliases.

Including the plugin and configuration in your JavaScript projects provides a way to define module aliases relative to the project root, and have Quokka find and run files that use those aliases.


## Setup

There are two ways to [configure][quokka-settings] the plugin via the `alias` key:

- manually declare path aliases
- import aliases from other configuration files


#### Manually declare aliases

To manually declare the aliases, use the `aliases` sub-key:

```json
{
  "plugins": ["alias-quokka-plugin"],
  "alias": {
    "aliases": {
      "@": "src/",
      "@/classes/": "src/classes/",
      "foo": "lib/other/foo"
    }
  }
}
```


#### Import aliases from other files

To import aliases from other configuration files, for example [WebPack][webpack-alias] or [TypeScript][typescript-alias], use the `import` sub-key:

```json
{
  "plugins": ["alias-quokka-plugin"],
  "alias": {
    "import": {
      "file": "build/webpack-base.config.js",
      "node": "resolve.alias"
    }
  }
}
```

The `file` child-node should be a relative path to a JavaScript or JSON file, and the `node` child node should be a dot-path to the node containing path aliases.

Having the plugin use existing config makes imports more reliable, and also the config file transferable between projects.

#### TypeScript support

Note that the plugin supports TypeScript's `tsconfig.json`'s alias declaration format:

- wildcards are stripped for alias keys and values
- arrays of paths are searched in order

To support TypeScript, declare paths, then use the following Quokka plugin config:

```json
{
  "import": {
    "file": "tsconfig.json",
    "node": "compilerOptions.paths"
  }
}
```

## Usage

In your script files, use aliased paths as declared in your config file:

```js
// ES5
const SomeClass = require('@/classes/SomeClass')

// ES6 + TypeScript
import SomeClass from '@/classes/SomeClass'
```

#### Demo

A demo project showcasing ES5, ES6, TypeScript, manually-declared and imported aliases is available at:

- https://github.com/davestewart/alias-quokka-plugin-demo


#### Debugging

If you're unsure what aliases the plugin has loaded and / or parsed, add the following key to the plugin config:

```json
{
  "debug": true
}
```

The plugin will output the aliases it is using:

```
Quokka #1 (node: v8.11.1, TypeScript: v3.1.1, plugins: alias-quokka-plugin)

[alias-quokka-plugin] : aliases = {
    "@/classes/": [
        "./src/classes/"
    ],
    "@/": [
        "./src/"
    ]
}
```

## Install

You can install the plugin as a dev dependency for your package:

#### Yarn

    yarn add --save --dev alias-quokka-plugin


#### NPM

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
[quokka-settings]:https://quokkajs.com/docs/configuration.html

[webpack-alias]:https://webpack.js.org/configuration/resolve/
[typescript-alias]:https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
