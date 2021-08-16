import {
  MAINNET_CHAINID,
  ROPSTEN_CHAINID,
  RINKEBY_CHAINID,
  GOERLI_CHAINID,
  KOVAN_CHAINID,
} from '../networks/chain-types'

import ContractNames from './sc-map'

export const kovanAddresses = {
  [ContractNames.TOKEN_SOLNAME]: '0x122938b76c071142ea6b39c34ffc38e5711cada1',
  [ContractNames.LICENSE_SOLNAME]: '0x7B133a9BD10F7AE52fa9528b8Bc0f3c34612674c',
}

export const mainAddresses = {}

const ADDRESSES_NW_MAP = {
  [MAINNET_CHAINID]: mainAddresses,
  [KOVAN_CHAINID]: kovanAddresses,
}

export function getAcceptedAddress(chainId) {
  let k = typeof chainId === 'string' ? parseInt(chainId) : chainId

  return ADDRESSES_NW_MAP[k] &&
    ADDRESSES_NW_MAP[k][ContractNames.LICENSE_SOLNAME]
    ? ADDRESSES_NW_MAP[k][ContractNames.LICENSE_SOLNAME]
    : ''
}

export default ADDRESSES_NW_MAP
