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
  const packData = web3js.eth.abi.encodeParameters(
    ['address', 'address', 'bytes32', 'uint32'],
    [
      '0x52996249f64d760ac02c6b82866d92b9e7d02f06',
      selectedAddress,
      purchaseHash,
      parseInt(purchaseDays),
    ]
  )

  console.log('>>>>>>>>>&&&&>>>', typeof packData, packData)
  const keccakPack = Web3Utils.keccak256(packData)

  const nPackData = web3js.eth.abi.encodeParameters(
    ['string', 'bytes32'],
    ['\x19Ethereum Signed Message:\n32', keccakPack]
  )

  const keccakHex = Web3Utils.keccak256(nPackData)
  // console.log('>>>>>>>>>&&&&>>>', keccakHex)

  // const signedData = await web3js.eth.personal.sign(keccakHex, selectedAddress)

  const signedData = await web3js.eth.personal.sign(keccakHex, selectedAddress)

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

export async function signTest(
  {
    selectedAddress = '0xFd30d2c32E6A22c2f026225f1cEeA72bFD9De865',
    purchaseId = '0x5ead50dc103533a2f153308b8245738ec7da2b93fd69e9d8305f21c7bb6dc548',
    contractAddr = '0x52996249f64d760ac02c6b82866d92b9e7d02f06',
    purchaseDays = 1,
    pri = '',
  },
  mode = 1
) {
  const web3js = await getWeb3Inst()

  if (!pri) throw new Error('miss pri')

  console.log('>>>>>>>>>>>>>>>>>>>>>>Sign Test>>>>>>>>>>>>>>>>>>>>>')

  const paramPack = web3js.eth.abi.encodeParameters(
    ['address', 'address', 'bytes32', 'uint32'],
    [contractAddr, selectedAddress, purchaseId, purchaseDays]
  )

  let paramPackHash = Web3Utils.keccak256(paramPack)
  console.log('ABI pack param : ', paramPack, paramPackHash)

  const prefixed = '\x19Ethereum Signed Message:\n32'

  const secPack = web3js.eth.abi.encodeParameters(
    ['string', 'bytes32'],
    [Web3Utils.utf8ToHex(prefixed), paramPackHash]
  )

  let secHash = Web3Utils.keccak256(secPack)
  console.log('Prefixed >>>', secPack, secHash)

  let psig = await web3js.eth.personal.sign(secHash, selectedAddress)

  let asig = await web3js.eth.accounts.sign(paramPackHash, pri)

  let verifyPsig = await web3js.eth.personal.ecRecover(secHash, psig)

  console.log('Personal verify sign : ', secHash, psig, verifyPsig)

  let asigValid = await web3js.eth.accounts.recover(
    paramPackHash,
    asig.signature,
    false
  )
  console.log(
    'Account verify sign : ',
    paramPackHash,
    asig.signature,
    asigValid
  )

  return {
    psig,
    asig,
  }
}
