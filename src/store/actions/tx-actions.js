import { SET_LAST_TX_STATUS } from '../core-action-types'

export const setLastTxStatus = (txHash = '', txStatus = '') => {
  return {
    type: SET_LAST_TX_STATUS,
    val: { txHash, txStatus },
  }
}
