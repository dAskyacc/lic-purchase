import {
  MAINNET_CHAINID,
  ROPSTEN_CHAINID,
  RINKEBY_CHAINID,
  GOERLI_CHAINID,
  KOVAN_CHAINID,
} from '../networks/chain-types'

import ContractNames from './sc-map'

export const TOKEN_ACCEPTED = 'tokenAcceptedAddress'
export const TOKEN_ACCEPTED_ADDRESS =
  '0xfbc01bd1fd789032c0741aef9e25810538708c20'
export const KOVAN_CONTROL_ADDRESS_MAP = {
  TOKEN_ACCEPTED: TOKEN_ACCEPTED_ADDRESS,
}

export default {
  [KOVAN_CHAINID]: KOVAN_CONTROL_ADDRESS_MAP,
}
