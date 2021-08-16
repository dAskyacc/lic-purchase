import { upperFirst } from 'lodash'

export const MAINNET_CHAIN_NAME = 'mainnet'
export const ROPSTEN_CHAIN_NAME = 'ropsten'
export const RINKEBY_CHAIN_NAME = 'rinkeby'
export const GOERLI_CHAIN_NAME = 'goerli'
export const KOVAN_CHAIN_NAME = 'kovan'

export const LOCAL_DEFUALT_NAME = 'local'

export const MAINNET_CHAINID = 0x1
export const ROPSTEN_CHAINID = 0x3
export const RINKEBY_CHAINID = 0x4
export const GOERLI_CHAINID = 0x5
export const KOVAN_CHAINID = 0x2a
export const BINANCE_SCTEST_CHAINID = 0x61

export const NETWORKS_NAME_MAP = {
  [MAINNET_CHAIN_NAME]: {
    text: 'Ethereum Main Network',
    name: upperFirst(MAINNET_CHAIN_NAME),
    chainId: MAINNET_CHAINID,
  },
  [ROPSTEN_CHAIN_NAME]: {
    text: 'Ropsten Test Network',
    name: upperFirst(ROPSTEN_CHAIN_NAME),
    chainId: ROPSTEN_CHAINID,
  },
  [RINKEBY_CHAIN_NAME]: {
    text: 'Rinkeby Test Network',
    name: upperFirst(RINKEBY_CHAIN_NAME),
    chainId: RINKEBY_CHAINID,
  },
  [GOERLI_CHAIN_NAME]: {
    text: 'Goerli Test Network',
    name: upperFirst(GOERLI_CHAIN_NAME),
    chainId: GOERLI_CHAINID,
  },
  [KOVAN_CHAIN_NAME]: {
    text: 'Kovan Test Network',
    name: upperFirst(KOVAN_CHAIN_NAME),
    chainId: KOVAN_CHAINID,
  },
}

export function findNetworkByChainId(chainId) {
  const nws = Object.values(NETWORKS_NAME_MAP)

  return nws.find(
    (n) => n.chainId === chainId || parseInt(n.chainId) === parseInt(chainId)
  )
}

export function findNetworkByNetwork(network) {
  const nws = NETWORKS_NAME_MAP[network.toLowerCase()]
  return nws
}

export default NETWORKS_NAME_MAP
