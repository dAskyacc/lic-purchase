import {
  SET_SELECTED_ADDRESS,
  SET_METAMASK_CHAINID,
} from '../core-action-types'

export const setConnectedAddress = (selectedAddress = '') => {
  return {
    type: SET_SELECTED_ADDRESS,
    val: selectedAddress,
  }
}

export const setChainId = (chainId) => {
  return {
    type: SET_METAMASK_CHAINID,
    val: chainId,
  }
}
