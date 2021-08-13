import { SET_LAST_ORDER_STATUS } from '../core-action-types'

export const updateLastPurchaseOrder = (
  purchaseId,
  purchaseDays,
  txHash,
  txStatus,
  signedData
) => {
  return {
    type: SET_LAST_ORDER_STATUS,
    val: {
      purchaseId,
      purchaseDays,
      txHash,
      txStatus,
      signedData,
    },
  }
}

export const resetLastPurchaseOrder = () => {
  return {
    type: SET_LAST_ORDER_STATUS,
    val: {
      purchaseId: '',
      purchaseDays: '',
      txHash: '',
      txStatus: '',
      signedData: '',
    },
  }
}
