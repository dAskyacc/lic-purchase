import Web3Utils from 'web3-utils'
import BizError from '../errors'
import ERR_MSG_MAP, { INSUFFICIENT_GAS_BALANCE } from '../errors/error-codes'

export const checkGasEnough = (ethWei = '0', gas, gasPrice = '1000000000') => {
  const gasFee = Web3Utils.toBN(gasPrice).muln(gas)

  if (Web3Utils.toBN(ethWei).lt(gasFee)) {
    throw new BizError(
      ERR_MSG_MAP[INSUFFICIENT_GAS_BALANCE],
      INSUFFICIENT_GAS_BALANCE
    )
  }

  return gasFee
}

export const intToByteArray = (n) => {
  let byteArray = [0, 0, 0, 0]

  for (let index = 0; index < byteArray.length; index++) {
    var byte = n & 0xff
    byteArray[index] = byte
    n = (n - byte) / 256
  }

  return byteArray.reverse()
}
