const get = require("object-get")
const Path = require("path")
const fs = require("fs")
const { _findPath } = require("module")
const { message, clean } = require("./utils")

/**
 * Build optimised alias tree
 *
 * - keys sorted and reversed
 * - paths stored as arrays
 *
 * @param   {object}  input   An object of alias:path or alias:[path, path, path] pairs
 * @returns an object of arrays
 */
function optimiseAliases(input) {
  const output = {}

  Object.keys(input)
    .sort()
    .reverse()
    .forEach(key => {
      const data = input[key]
      output[clean(key)] = Array.isArray(data)
        ? data.map(path => clean(path))
        : [clean(data)]
    })

  return output
}

/**
 * Load aliases from user-supplied file
 *
 * @param   {string}  file  The relative path to a configuration file
 * @param   {string}  node  The child node path to parse for aliases
 */
function loadAliases(file, node) {
  const path = Path.join(Path.resolve("."), file)

  const config = require(path)
  if (typeof config !== "object") {
    throw new Error(message(`no config file found at path '${path}'`))
  }

  const data = get(config, node || "")
  if (!data) {
    throw new Error(
      message(`no alias data found in file '${file}' at node '${node}'`)
    )
  }

  return optimiseAliases(data)
}

/**
 * Get path(s) for a given alias
 *
 * - full alias must match start of path
 *
 * @param   {object}  aliases   A hash of aliases
 * @param   {string}  alias     The alias to find
 * @returns {string[]|undefined}
 */
function getAlias(aliases, alias) {
  const key = Object.keys(aliases).find(key => alias.indexOf(key) === 0)

  if (key) {
    return { id: key, paths: aliases[key] }
  }
}

/**
 * Resolve an absolute path for a target based on alias and
 *
 * @param   {string}  target  The target module path including the alias, i.e. @/classes/SomeClass
 * @param   {string}  alias   The alias to replace, i.e @/classes/
 * @param   {array}   paths   An array of paths where the resolved target module might be found
 * @returns {string}
 */
function resolvePath(target, alias, paths) {
  const root = Path.resolve(".")

  for (let i = 0; i < paths.length; i++) {
    const relPath = target.replace(alias, paths[i])
    const modPath = !relPath.startsWith("/")
      ? Path.join(root, relPath)
      : relPath
    const absPath = _findPath(modPath)

    if (fs.existsSync(absPath)) {
      return absPath
    }
  }

  throw new Error(
    `Cannot resolve aliased module ${target}" on configured path(s) ${paths.join(
      ", "
    )}`
  )
}

module.exports = {
  loadAliases,
  optimiseAliases,
  getAlias,
  resolvePath
}
