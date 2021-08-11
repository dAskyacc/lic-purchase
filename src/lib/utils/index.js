export { getUUID32Hex } from './random-utils'

export function compressAddress(address) {
  if (!address || !address.trim().length || typeof address !== 'string')
    return address
  const _s = address.trim()
  const len = _s.length
  if (len < 12) return _s

  return _s.startsWith('0x')
    ? `${_s.slice(0, 6)}...${_s.slice(-4)}`
    : `${_s.slice(0, 4)}...${_s.slice(-4)}`
}
