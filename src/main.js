'use strict'

const Path = require('path')
const { _load, Module } = require('module')

function resolvePath (aliases, src) {
  let key, path
  for (key in aliases) {
    path = aliases[key]
    if (src.indexOf(key) === 0) {
      return src.replace(key, path)
    }
  }
  return null
}

exports.before = config => {
  const root = Path.resolve('.')
  const aliases = config.alias || {}
  Module._load = (path, ...rest) => {
    const src = resolvePath(aliases, path)
    return src
      ? _load(Path.join(root, src), ...rest)
      : _load(path, ...rest)
  }
}
