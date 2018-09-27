'use strict'

const fs = require('fs')
const Path = require('path')
const { _load, _findPath, Module } = require('module')

function resolveAlias (aliases, src) {
  let key, path
  for (key in aliases) {
    path = aliases[key]
    if (src.indexOf(key) === 0) {
      return src.replace(key, path)
    }
  }
  return null
}

function resolvePath (src, path) {
  const root = Path.resolve('.')
  const relPath = Path.join(root, src)
  const absPath = _findPath(relPath)
  if (fs.existsSync(absPath)) {
    return absPath
  }
  throw new Error('Cannot resolve module "' +src+ '" via aliased path "' + path + '"')
}

exports.before = config => {
  const aliases = config.alias || {}
  Module._load = (path, ...rest) => {
    const src = resolveAlias(aliases, path)
    return src
      ? _load(resolvePath(src, path), ...rest)
      : _load(path, ...rest)
  }
}
