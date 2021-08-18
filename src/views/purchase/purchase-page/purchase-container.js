import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PurchasePage from './purchase-comp'

import { etherscanUrl, KOVAN_CHAIN_NAME } from '~Lib/networks'
import checkCurrentChainState, { getWeb3Inst } from '~Lib/web3'

import {
  setEthBalance,
  setTokenBalance,
  setTokenAcceptedAddress,
  setTokenAllowance,
  updateNeedApprove,
} from '~Store/actions/token-actions'

import {
  setConnectedAddress,
  setChainId,
} from '~Store/actions/metamask-actions'

import {
  updateLastPurchaseOrder,
  updateOrderList,
} from '~Store/actions/order-actions'

import { weiToEtherFixed } from '~/lib/web3/utils/token-utils'

import { getNCCTokenInst } from '~/lib/web3/apis/token-api'
import { getChatLicenseSCInst } from '~Lib/web3/apis/chat-license-api'

import { validateTx } from '~Lib/web3/tx-helper'
import { getAcceptedAddress } from '~Lib/contracts/addresses'
import { transOrders } from '~Lib/biz/localstorage-middleware'

import {
  checkAllowance,
  approveAccept,
  purchaseLicense,
  packParams,
  getCompleteOrders,
} from '~Lib/biz/purchase-biz'
window.packParams = packParams
/**
 *
 * @module: purchase/purchase-page
 * @Created:  21-08-11 20:34 Wednesday
 * make state inject into react dom props
 *
 */
const mapStateToProps = (state) => {
  // global state contains skinState ... ed.
  const { mmState, tokenState, orderState, skinState } = state

  const { isMobile } = skinState
  const { chainId, selectedAddress } = mmState

  const {
    tokenSymbol,
    tokenBalance,
    ethBalance,
    tokenAccepted,
    tokenAllowance = {},
    needApprove,
  } = tokenState

  const { purchaseId, txHash, txStatus, purchaseDays } = orderState

  const txEnabled = validateTx(txHash, txStatus)

  const allowanceValt = tokenAccepted ? tokenAllowance[tokenAccepted] : 0
  return {
    isMobile,
    chainId,
    selectedAddress,
    tokenSymbol,
    tokenBalance,
    ethBalance,
    tokenBalText: weiToEtherFixed(tokenBalance, 2),
    ethBalText: weiToEtherFixed(ethBalance, 4),
    lastOrder: orderState,
    txEnabled,
    allowanceValt,
    tokenAccepted,
    needApprove: needApprove,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openKovanEtherscanTab: ({ tx, loading }) => {
      try {
        if (loading) return
        const url = etherscanUrl({
          network: KOVAN_CHAIN_NAME,
          type: 'tx',
          param: tx,
        })

        window.open(url, KOVAN_CHAIN_NAME)
      } catch (err) {}
    },
    recheckAllowance: async ({ requiredDays }) => {
      // console.log('>>>>>>>>requiredDays>>>>>>>>', requiredDays)
      if (!requiredDays || requiredDays < 0) return
      const { chainId, selectedAddress } = await checkCurrentChainState()
      const web3js = await getWeb3Inst()
      const tokenInst = getNCCTokenInst(web3js, chainId, selectedAddress)
      const acceptedAddress = getAcceptedAddress(chainId)
      const { needApprove, allowance } = await checkAllowance(tokenInst, {
        selectedAddress,
        requiredDays,
        acceptedAddress,
      })

      // console.log('>>>needApprove>>>>>', needApprove)
      dispatch(setTokenAllowance(selectedAddress, allowance))
      dispatch(updateNeedApprove(needApprove))

      return needApprove
    },
    /**
     *
     * @param {string} param0
     */
    silentQueryBalance: async () => {
      try {
        const { chainId, selectedAddress } = await checkCurrentChainState()
        const web3js = await getWeb3Inst()

        dispatch(setChainId(chainId))
        dispatch(setConnectedAddress(selectedAddress))

        window.web3js = web3js

        if (!selectedAddress) {
          selectedAddress = await getConnectedAddress()
        }

        //

        const ethBal = await web3js.eth.getBalance(selectedAddress)
        dispatch(setEthBalance(ethBal))

        const tokenInst = getNCCTokenInst(web3js, chainId, selectedAddress)

        const tokenBal = await tokenInst.methods
          .balanceOf(selectedAddress)
          .call()
        dispatch(setTokenBalance(tokenBal))

        const licInst = getChatLicenseSCInst(web3js, chainId, selectedAddress)
        window.licInst = licInst

        /** allowance */
        const acceptedAddress = getAcceptedAddress(chainId)

        dispatch(setTokenAcceptedAddress(acceptedAddress))
        const { needApprove, allowance } = await checkAllowance(tokenInst, {
          selectedAddress,
          requiredDays: 30,
          acceptedAddress,
        })
        dispatch(setTokenAllowance(selectedAddress, allowance))
        dispatch(updateNeedApprove(needApprove))
      } catch (err) {
        console.log(`load balance fail.`, err)
      }
    },
    approveToAcceptAddress: async (purchaseDays) => {
      try {
        const { chainId, selectedAddress } = await checkCurrentChainState()
        const web3js = await getWeb3Inst()
        const acceptedAddress = getAcceptedAddress(chainId)
        const tokenInst = getNCCTokenInst(web3js, chainId, selectedAddress)
        const { needApprove, allowance } = await approveAccept(tokenInst, {
          selectedAddress,
          acceptedAddress,
          purchaseDays,
        })

        dispatch(setTokenAllowance(selectedAddress, allowance))
        dispatch(updateNeedApprove(needApprove))
      } catch (err) {
        console.error(err)
        throw new Error('授权失败')
      }
    },
    silentReloadOrders: async ({ purchaseId, signature58 }) => {
      try {
        const { chainId, selectedAddress } = await checkCurrentChainState()
        const web3js = await getWeb3Inst()

        const inst = await getChatLicenseSCInst(
          web3js,
          chainId,
          selectedAddress
        )

        let orderList = await getCompleteOrders(inst, {
          selectedAddress,
          chainId,
        })

        orderList = await transOrders(selectedAddress, orderList, {
          purchaseId,
          signature58,
        })

        dispatch(updateOrderList(orderList))

        return { purchaseId, signature58 }
      } catch (error) {
        console.warn(error)
      }
    },
    purchaseLicSubmit: async ({ purchaseDays }) => {
      const { chainId, selectedAddress } = await checkCurrentChainState()
      const web3js = await getWeb3Inst()

      const { estimatedGasFee, allowance, needApprove, order } =
        await purchaseLicense(web3js, {
          chainId,
          selectedAddress,
          purchaseDays,
        })

      // console.log('>>>>>>>>>Order>>>>>>', order)
      dispatch(setTokenAllowance(selectedAddress, allowance))
      dispatch(updateNeedApprove(needApprove))

      const { purchaseId, txHash, txStatus, signedData } = order
      dispatch(
        updateLastPurchaseOrder(
          purchaseId,
          purchaseDays,
          txHash,
          txStatus,
          signedData
        )
      )

      return order
    },
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(PurchasePage)
