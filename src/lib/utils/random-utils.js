/**
 *
 * @param {int} size
 * @returns
 */
export function getUUIDBuffer(size = 32) {
  if (!window.crypto)
    throw new Error(
      'Your browser unsupport Crypto,please check new version browser.'
    )
  const _size = size > 0 ? size : 32
  let random = new Uint8Array(_size)
  return window.crypto.getRandomValues(random)
}
/**
 *
 * @returns hex string
 */
export function getUUID32Hex() {
  return bufToHex(getUUIDBuffer(32))
}

/**
 *
 * @param {Uint8Array} buf
 * @returns hex string
 */
export function bufToHex(buf) {
  if (!buf) return 0x0
  if (!buf instanceof Uint8Array)
    throw new TypeError('buf must Uint8Array type.')

  return Array.prototype.map
    .call(buf, (x) => ('00' + x.toString(16)).slice(-2))
    .join('')
}
