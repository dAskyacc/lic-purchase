import {
  SET_ETH_BALANCE,
  SET_TOKEN_BALANCE,
  SET_TOEKN_SYMBOL,
  SET_TOKEN_ACCEPTED,
  SET_TOKEN_ALLOWANCE,
  UPD_TOKEN_NEED_APPROVE,
} from '../../core-action-types'

export default function reduceTokens(state = {}, { type, val }) {
  const tokenState = {
    tokenAllownce: {},
    ethBalance: 0,
    tokenBalance: 0,
    tokenSymbol: 'NCC',
    tokenAccepted: '',
    needApprove: true,
    ...state,
  }

  switch (type) {
    case SET_ETH_BALANCE:
      return {
        ...tokenState,
        ethBalance: val,
      }
    case SET_TOKEN_BALANCE:
      return {
        ...tokenState,
        tokenBalance: val,
      }
    case SET_TOEKN_SYMBOL:
      return {
        ...tokenState,
        tokenSymbol: val,
      }
    case SET_TOKEN_ACCEPTED:
      return {
        ...tokenState,
        tokenAccepted: val,
      }

    case SET_TOKEN_ALLOWANCE: {
      const { senderAddress, allowance = 0 } = val || {}

      const tokenAllownce = {
        ...tokenState.tokenAllownce,
        [senderAddress]: allowance,
      }

      return {
        ...tokenState,
        tokenAllownce,
      }
    }
    case UPD_TOKEN_NEED_APPROVE:
      return {
        ...tokenState,
        needApprove: Boolean(val),
      }
    default:
      return { ...tokenState }
  }
}
