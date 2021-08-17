export const UNKNOW_EEROR_CODE = 99999999
export const BIZ_ERROR_CODE = 77777777
export const ETHEREUM_UNDEFINED_CODE = 90300001

/**
 * Web3 error
 */
export const WEB3_ERROR_CODE = 93000000
export const WEB3_USER_REJECTED_REQ = 4001
export const WEB3_UNAUTHORIZED = 4100
export const WEB3_UNSUPPORTED_METHOD = 4200
export const WEB3_REQUEST_AWAIT = -32002

/**
 * contract initial error
 */
export const UNSUPPORT_NETWORK = 77000000
export const NO_CONNECTED_ACCOUNT = 77100000
export const INSUFFICIENT_GAS_BALANCE = 77200001

export const BIZ_SIGNED_ACCOUNT_ERROR = 77300001;


export const NO_CONTRACT_ABI = 77000001
export const NO_CONTRACT_ADDRESS = 77000002

export default {
  [UNSUPPORT_NETWORK]: '当前网络不支持,请切换至Kovan网络.',
  [NO_CONNECTED_ACCOUNT]: 'Dapp 没有MetaMask账号链接授权,请重新授权',
  [INSUFFICIENT_GAS_BALANCE]: 'Insufficient balance: ETH Gas fee.',
}
