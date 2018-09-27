'use strict'

const fs = require('fs')
const Path = require('path')
const { _load, _findPath, Module } = require('module')

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
    if (src) {
      const relPath = Path.join(root, src)
      const absPath = _findPath(relPath)
      if (fs.existsSync(absPath)) {
        return _load(relPath, ...rest)
      }
      else {
        throw new Error('Unable to resolve module "' +src+ '" via aliased path "' + path + '"')
      }
    }
    return _load(path, ...rest)
  }
}
