import { SET_LAST_ORDER_STATUS } from '../../core-action-types'

export default function reducerOrder(state = {}, { type, val }) {
  const orderState = {
    purchaseId: '',
    txHash: '',
    txStatus: '',
    purchaseDays: 0,
    signedData: '',
    ...state,
  }

  switch (type) {
    case SET_LAST_ORDER_STATUS: {
      console.log('&&&&', val)
      return {
        ...orderState,
        ...val,
      }
    }
    default:
      return orderState
  }
}
