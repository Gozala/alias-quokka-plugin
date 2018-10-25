/**
 * Clean TypeScript keys and paths
 *
 * @param   {string}  path   The string to clean
 * @returns {string}
 */
function clean(path) {
  return path.replace(/\*$/, "")
}

/**
 * Log out full object structure
 *
 * @param {string}  label   An additional label
 * @param {*}       value   The target value / object
 */
function inspect(label, value) {
  const data = JSON.stringify(value, null, "    ")
  console.log(message(label + " = " + data))
}

/**
 * Create log message
 *
 * @param {string}  text    The text to create a message from
 */
function message(text) {
  return "[alias-quokka-plugin] : " + (text || "")
}

module.exports = {
  clean,
  inspect,
  message
}
