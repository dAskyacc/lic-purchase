import { KOVAN_CHAINID, findNetworkByNetwork } from './chain-types'

export { findNetworkByChainId, KOVAN_CHAIN_NAME } from './chain-types'

export function chainSupported(chainId) {
  return parseInt(chainId) === parseInt(KOVAN_CHAINID)
}


export function etherscanUrl(options) {
  let config = {
    network: '',
    type: 'tx',
    param: '',
  }
  if (typeof options === 'string') {
    config.param = options
  } else if (typeof options === 'object') {
    config = {
      ...config,
      ...options,
    }
  }

  let { network, type, param } = config
  const nw = findNetworkByNetwork(network)
  if (!nw) throw new Error('Etherscan Unspport network [' + network + '].')

  switch (type) {
    case 'tx':
    case 'address':
      return network
        ? `https://${network}.etherscan.io/${type}/${param}`
        : `https://etherscan.io/${type}/${param}`
    default:
      return network
        ? `https://${network}.etherscan.io/tx/${param}`
        : `https://etherscan.io/tx/${param}`
  }
}
