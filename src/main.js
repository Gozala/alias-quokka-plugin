"use strict"

const { _load, Module } = require("module")
const {
  loadAliases,
  optimiseAliases,
  getAlias,
  resolvePath
} = require("./helpers")
const { inspect } = require("./utils")

exports.before = config => {
  const settings = config.alias || {}

  let aliases = settings.import
    ? loadAliases(settings.import.file, settings.import.node)
    : optimiseAliases(settings.aliases || {})

  if (settings.debug) {
    inspect("aliases", aliases)
  }

  Module._load = function(target, ...rest) {
    const alias = getAlias(aliases, target)
    return alias
      ? _load(resolvePath(target, alias.id, alias.paths), ...rest)
      : _load(target, ...rest)
  }
}
