import { SET_LAST_ORDER_STATUS, UPD_ORDER_LIST } from '../core-action-types'

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

export const updateOrderList = (list = []) => {
  return {
    type: UPD_ORDER_LIST,
    val: list,
  }
}
