import Web3Utils from 'web3-utils'

export function weiToEtherFixed(wei = '0', fixedNum = 4) {
  if (/^[0]*(\.)?[0]*$/.test(wei) || wei.trim() === '') {
    return '0.00'
  }

  fixedNum = fixedNum > 6 || fixedNum < 0 ? 4 : fixedNum

  let valt = Web3Utils.fromWei(wei.toString(), 'ether')
  valt = parseFloat(valt).toFixed(fixedNum)

  return /^\d*\.[0-9]{2}00$/.test(valt)
    ? parseFloat(valt).toFixed(fixedNum - 2)
    : valt
}

export function weiToGweiFixed(wei = '0', fixedNum = 2) {
  if (/^[0]*(\.)?[0]*$/.test(wei) || wei.trim() === '') {
    return '0.00'
  }

  fixedNum = fixedNum > 6 || fixedNum < 0 ? 4 : fixedNum
  const sValt = Web3Utils.toWei(
    Web3Utils.fromWei(wei.toString(), 'ether'),
    'Gwei'
  )

  const valt = parseFloat(sValt.toString()).toFixed(fixedNum)

  return /^\d*\.[0-9]{2}00$/.test(valt)
    ? parseFloat(valt).toFixed(fixedNum - 2)
    : valt
}

export function etherToWeiBN(valt = 0) {
  let val = '0'
  if (typeof valt === 'number') {
    val = valt.toString()
  } else if (typeof valt === 'string' && /^[0-9]*$/.test(valt)) {
    val = valt
  } else {
    throw new TypeError('valt illegal.')
  }

  return Web3Utils.toBN(Web3Utils.toWei(val, 'ether'))
}

export function weiToEtherNumber(wei) {
  if (!wei) return new Number(0)
  return new Number(Web3Utils.fromWei(wei, 'wei'))
}
