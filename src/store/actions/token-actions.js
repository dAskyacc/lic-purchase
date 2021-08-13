import {
  SET_ETH_BALANCE,
  SET_TOKEN_BALANCE,
  SET_TOKEN_ACCEPTED,
  SET_TOKEN_ALLOWANCE,
  UPD_TOKEN_NEED_APPROVE,
} from '../core-action-types'

export const setEthBalance = (balance = 0) => {
  return {
    type: SET_ETH_BALANCE,
    val: balance,
  }
}

export const setTokenBalance = (balance = 0) => {
  return {
    type: SET_TOKEN_BALANCE,
    val: balance,
  }
}

export const setTokenAcceptedAddress = (address = '') => {
  return {
    type: SET_TOKEN_ACCEPTED,
    val: address,
  }
}

export const setTokenAllowance = (selectedAddress, allowance = 0) => {
  return {
    type: SET_TOKEN_ALLOWANCE,
    val: {
      senderAddress: selectedAddress,
      allowance,
    },
  }
}

export const updateNeedApprove = (needApprove) => {
  return {
    type: UPD_TOKEN_NEED_APPROVE,
    val: needApprove,
  }
}
