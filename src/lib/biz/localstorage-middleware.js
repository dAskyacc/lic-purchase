import bs58 from 'bs58'
import { hexToUtf8, bytesToHex, fromUtf8, hexToBytes } from 'web3-utils'

export async function transOrders(selectedAddress, orderList = []) {
  if (!selectedAddress) throw new TypeError('selectedAddress miss.')
  if (!localStorage) {
    console.log('unspport localstorage, ignore signed data load.')
    return orderList
  }
  let k = selectedAddress.toLowerCase()
  let _orders = orderList
  try {
    const localOrder58 = localStorage.getItem(k)
    if (localOrder58) {
      const localOrders = parseOrderListFrom58(localOrder58)

      const localOrderMap = localOrders.reduce((m, v) => {
        return v.purchaseId
          ? {
              ...m,
              [v.purchaseId]: v,
            }
          : m
      }, {})

      _orders = _orders.map((o) => {
        if (o.purchaseId && localOrderMap[o.purchaseId]) {
          return {
            ...o,
            signature58: localOrderMap[o.purchaseId]['signature58'] || '',
          }
        } else {
          return o
        }
      })
    }

    const newSerail58str = serializeOrdersTo58(_orders)
    // update local
    localStorage.setItem(k, newSerail58str)
  } catch (err) {
    console.log('locale middle ware error', err)
  }

  return _orders
}

export async function updOrderSignature58(
  selectedAddress,
  orderList = [],
  order = {}
) {
  if (!selectedAddress) throw new TypeError('selectedAddress miss.')
  let _orders = orderList
  const { purchaseId, signature58 } = order
  //   console.log('updOrderSignature58>>>>>>>>>>>>', purchaseId, signature58)
  if (!localStorage) {
    console.log('unspport localstorage, ignore signed data load.')
    const idx = orderList.findIndex((o) => o.purchaseId === purchaseId)
    if (idx >= 0 && signature58) {
      const updOrder = {
        ...orderList[idx],
        signature58,
      }
      _orders = orderList.splice(idx, 1, updOrder)
    }
    return _orders
  }

  let k = selectedAddress.toLowerCase()
  try {
    const localOrder58 = localStorage.getItem(k)
    if (localOrder58) {
      const localOrders = parseOrderListFrom58(localOrder58)

      const localOrderMap = localOrders.reduce((m, v) => {
        return v.purchaseId
          ? {
              ...m,
              [v.purchaseId]: v,
            }
          : m
      }, {})

      _orders = _orders.map((o) => {
        if (o.purchaseId && localOrderMap[o.purchaseId]) {
          const _o = {
            ...o,
            signedData: localOrderMap[o.purchaseId]['signature58'] || '',
          }

          if (o.purchaseId === purchaseId) {
            _o.signature58 = signature58
          }
          return _o
        } else {
          return o.purchaseId === purchaseId ? { ...o, signature58 } : o
        }
      })
    } else {
      _orders = _orders.map((o) => {
        return o.purchaseId === purchaseId ? { ...o, signature58 } : o
      })
    }

    const newSerail58str = serializeOrdersTo58(_orders)
    // update local
    localStorage.setItem(k, newSerail58str)
  } catch (err) {
    console.log('locale middle ware error', err)
  }

  return _orders
}

/**
 *
 * @param {string} base58Str
 * @returns Array
 */
export function parseOrderListFrom58(base58Str) {
  if (!base58Str) return []
  let olist = []
  try {
    const deBuf = bs58.decode(base58Str)
    const serialOrders = hexToUtf8(bytesToHex(deBuf))
    olist = JSON.parse(serialOrders)
  } catch (error) {
    console.log('parse order list error', error)
    throw error
  }
  return olist
}

/**
 *
 * @param {Array} orders
 * @returns string
 */
export function serializeOrdersTo58(orders = []) {
  if (!orders instanceof Array)
    throw new TypeError('order type error.must array')

  const serialStr = JSON.stringify(orders)
  const buf = hexToBytes(fromUtf8(serialStr))

  return bs58.encode(buf)
}
