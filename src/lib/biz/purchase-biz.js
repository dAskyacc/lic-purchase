/**
 * @Deps :
 *  Web3
 */
import Web3Utils from 'web3-utils'

import BizError from '../errors'
import { BIZ_ERROR_CODE } from '../errors/error-codes'
import { DEFAULT_ALLOWANCE_COIN, getNCCTokenInst } from '../web3/apis/token-api'
import { getChatLicenseSCInst } from '../web3/apis/chat-license-api'
import { getUUID32Hex } from '../utils/random-utils'
import { getAcceptedAddress } from '../contracts/addresses'

import { checkGasEnough } from './biz-utils'
import { TX_FAILED, TX_COMPLETED } from '../web3/tx-helper'
import { getWeb3Inst } from '../web3'

import ABI from 'ethereumjs-abi'
window.ABI = ABI
window.Web3Utils = Web3Utils
export async function checkAllowance(
  tokenInst,
  { selectedAddress, acceptedAddress, requiredDays = '0' }
) {
  if (!acceptedAddress)
    throw new BizError(
      `current chain [${chainId}] unset Accepted Address.`,
      BIZ_ERROR_CODE
    )

  const allowance = await tokenInst.methods
    .allowance(selectedAddress, acceptedAddress)
    .call()

  const requiredWei = Web3Utils.toWei(requiredDays.toString(), 'ether')

  const needApprove = Web3Utils.toBN(allowance).lt(Web3Utils.toBN(requiredWei))

  return {
    needApprove,
    allowance,
  }
}

export async function approveAccept(
  tokenInst,
  { selectedAddress, acceptedAddress, requiredDays = '0' }
) {
  const allowanceWei = Web3Utils.toWei(
    DEFAULT_ALLOWANCE_COIN.toString(),
    'ether'
  )
  const gas = await tokenInst.methods
    .approve(acceptedAddress, allowanceWei)
    .estimateGas({ from: selectedAddress })

  const tx = await tokenInst.methods
    .approve(acceptedAddress, allowanceWei)
    .send({ from: selectedAddress, gas: gas.toString() })

  const requiredWei = Web3Utils.toWei(requiredDays.toString(), 'ether')
  const needApprove = Web3Utils.toBN(allowanceWei).lt(
    Web3Utils.toBN(requiredWei)
  )

  return {
    allowance: allowanceWei,
    needApprove,
  }
}

/**
 *
 */
export async function purchaseLicense(
  web3js,
  { chainId, selectedAddress, purchaseDays = 0 }
) {
  if (!purchaseDays || purchaseDays < 0)
    throw new TypeError(`purchaseDays ${purchaseDays} illegal.`)

  const acceptedAddress = getAcceptedAddress(chainId)

  const randomHexStr = getUUID32Hex()
  const purchaseHash = Web3Utils.keccak256(randomHexStr)

  const ethBal = await web3js.eth.getBalance(selectedAddress)

  const tokenInst = getNCCTokenInst(web3js, chainId, selectedAddress)
  const tokenBal = await tokenInst.methods.balanceOf(selectedAddress).call()

  if (
    Web3Utils.toBN(tokenBal).lt(
      Web3Utils.toBN(Web3Utils.toWei(purchaseDays.toString(), 'ether'))
    )
  )
    throw new BizError(
      `NCC 余额 ${Web3Utils.fromWei(
        tokenBal,
        'wei'
      )} 不足以支付 ${purchaseDays}天license.`
    )

  const licInst = getChatLicenseSCInst(web3js, chainId, selectedAddress)

  const gas = await licInst.methods
    .GenerateLicense(purchaseHash, purchaseDays)
    .estimateGas({ from: selectedAddress })

  const gasPrice = await web3js.eth.getGasPrice()

  const estimatedGasFee = checkGasEnough(ethBal, gas, gasPrice)

  const receiptTx = await licInst.methods
    .GenerateLicense(purchaseHash, purchaseDays)
    .send({ from: selectedAddress, gas: gas.toString() })

  console.log('>>>>>>>>>>>>', receiptTx)
  const txHash = receiptTx.transactionHash

  // 签名
  const signParams = {
    contractAddress: getAcceptedAddress(chainId),
    issueAddr: selectedAddress,
    purchaseId: purchaseHash,
    purchaseDays: purchaseDays,
  }
  const packData = packParams(web3js, signParams)

  const keccakPack = Web3Utils.keccak256(packData)
  console.log('>>>>>>>>>&&&&>>>', signParams, packData, keccakPack)

  // const signedData = await web3js.eth.personal.sign(keccakHex, selectedAddress)

  const signedData = await web3js.eth.personal.sign(keccakPack, selectedAddress)

  console.log('>>>>>>>signedData&>>>', signedData)

  // signTx
  const signTxInput = {
    from: selectedAddress,
    to: acceptedAddress,
    data: packData,
  }

  // reload allownce

  const allowance = await tokenInst.methods
    .allowance(selectedAddress, acceptedAddress)
    .call()

  const requiredWei = Web3Utils.toWei(purchaseDays.toString(), 'ether')

  const needApprove = Web3Utils.toBN(allowance).lt(Web3Utils.toBN(requiredWei))

  return {
    estimatedGasFee,
    allowance,
    acceptedAddress,
    needApprove,
    order: {
      purchaseId: purchaseHash,
      txHash,
      txStatus: receiptTx.status ? TX_COMPLETED : TX_FAILED,
      purchaseDays,
      signedData,
    },
  }
}


export function packParams(
  web3js,
  { contractAddress, issueAddr, purchaseId, purchaseDays }
) {
  if (
    !web3js ||
    !contractAddress ||
    !issueAddr ||
    !purchaseId ||
    purchaseDays <= 0
  )
    throw new TypeError('parameters illegal.')

  return web3js.eth.abi.encodeParameters(
    ['address', 'address', 'bytes32', 'uint'],
    [contractAddress, issueAddr, purchaseId, purchaseDays]
  )
}
