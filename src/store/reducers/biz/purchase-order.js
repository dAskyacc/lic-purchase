import { SET_LAST_ORDER_STATUS, UPD_ORDER_LIST } from '../../core-action-types'

export default function reducerOrder(state = {}, { type, val }) {
  
  const orderState = {
    purchaseId: '',
    txHash: '',
    txStatus: '',
    purchaseDays: 0,
    signedData: '',
    orderList: [],
    ...state,
  }

  switch (type) {
    case SET_LAST_ORDER_STATUS: {
      return {
        ...orderState,
        ...val,
      }
    }

    case UPD_ORDER_LIST: {
      return {
        ...orderState,
        orderList: val,
      }
    }
    default:
      return orderState
  }
}
