import { SET_LAST_TX_STATUS } from '../../core-action-types'

export default function reduceTx(state = {}, { type, val }) {
  const txState = {
    lastTxHash: '',
    lastTxStatus: '',
    txs: [],
    ...state,
  }

  switch (type) {
    case SET_LAST_TX_STATUS: {
      const { txHash, txStatus } = val || {}
      return {
        ...txState,
        lastTxHash: txHash,
        lastTxStatus: txStatus,
      }
    }
    default:
      return txState
  }
}
