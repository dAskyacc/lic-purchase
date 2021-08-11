import { SET_SELECTED_ADDRESS } from '../core-action-types'

export const setConnectedAddress = (selectedAddress = '') => {
  return {
    type: SET_SELECTED_ADDRESS,
    val: selectedAddress,
  }
}
