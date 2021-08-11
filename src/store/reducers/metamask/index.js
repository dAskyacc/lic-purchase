import {
  SET_HAS_METAMAK,
  SET_METAMASK_CHAINID,
  SET_SELECTED_ADDRESS,
} from '../../core-action-types'

import {
  checkMetaMaskEnv,
  getMMChainId,
  getSelectedAddress,
} from '~Lib/metamask'

export default function reduceMetaMask(state = {}, { type, val }) {
  const mmState = {
    installed: checkMetaMaskEnv(),
    chainId: getMMChainId(),
    selectedAddress: getSelectedAddress(),
    ...state,
  }

  switch (type) {
    case SET_HAS_METAMAK:
      return {
        ...mmState,
        installed: Boolean(val),
      }
    case SET_METAMASK_CHAINID:
      return {
        ...mmState,
        chainId: val,
      }
    case SET_SELECTED_ADDRESS:
      return {
        ...mmState,
        selectedAddress: val || '',
      }
    default:
      return {
        ...mmState,
      }
  }
}
