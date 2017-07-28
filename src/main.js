"use strict"

const Path = require("path")
const { _load, Module } = require("module")

exports.before = config => {
  const root = Path.resolve(".")
  Module._load = (path, ...rest) => {
    const alias = config.alias && config.alias[path]
    if (alias) {
      return _load(Path.join(root, alias), ...rest)
    } else {
      return _load(path, ...rest)
    }
  }
}
