import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import OrderPage from './order-comp'

import checkCurrentChainState, { getWeb3Inst } from '~Lib/web3'
import { chainSupported } from '~Lib/networks'
import { getChatLicenseSCInst } from '~Lib/web3/apis/chat-license-api'
import { getCompleteOrders } from '~Lib/biz/purchase-biz'

import { updateOrderList } from '~Store/actions/order-actions'
import {
  transOrders,
  updOrderSignature58,
} from '~Lib/biz/localstorage-middleware'
import { getAcceptedAddress } from '~Lib/contracts/addresses'
import { signedLicense } from '~Lib/biz/purchase-biz'
import BizError from '~/lib/errors'
import { BIZ_SIGNED_ACCOUNT_ERROR } from '~Lib/errors/error-codes'
/**
 *
 * @module: purchase/orders
 * @Created:  21-08-17 16:08 Tuesday
 * make state inject into react dom props
 *
 */
const mapStateToProps = (state) => {
  // global state contains skinState ... ed.
  const { mmState, orderState = {} } = state

  const { chainId, selectedAddress } = mmState
  let { orderList = [] } = orderState

  return {
    chainId,
    selectedAddress,
    orderList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    silentQueryOrders: async () => {
      try {
        const { chainId, selectedAddress } = await checkCurrentChainState()
        const web3js = await getWeb3Inst()
        if (chainSupported(chainId)) {
          const inst = await getChatLicenseSCInst(
            web3js,
            chainId,
            selectedAddress
          )

          let orderList = await getCompleteOrders(inst, {
            selectedAddress,
            chainId,
          })

          orderList = await transOrders(selectedAddress, orderList)

          dispatch(updateOrderList(orderList))
        }
      } catch (error) {
        console.warn(error)
      }
    },
    queryOrders: async () => {
      const { chainId, selectedAddress } = await checkCurrentChainState()
      const web3js = await getWeb3Inst()
      if (chainSupported(chainId)) {
        const inst = await getChatLicenseSCInst(
          web3js,
          chainId,
          selectedAddress
        )

        let orderList = await getCompleteOrders(inst, {
          selectedAddress,
          chainId,
        })

        orderList = await transOrders(selectedAddress, orderList)

        dispatch(updateOrderList(orderList))
      }
    },
    signedAndUPDOrders: async (order = {}, orderList = []) => {
      const { issueAddress, purchaseId, purchaseDays } = order
      const { chainId, selectedAddress } = await checkCurrentChainState()
      const web3js = await getWeb3Inst()
      const contractAddress = getAcceptedAddress(chainId)
      if (
        !issueAddress ||
        issueAddress.toLowerCase() !== selectedAddress.toLowerCase()
      )
        throw new BizError(
          `当前账号与购买时账号不一致,请使用[${issueAddress}]账号签名.`,
          BIZ_SIGNED_ACCOUNT_ERROR
        )
      const orderParts = await signedLicense(web3js, selectedAddress, {
        contractAddress,
        issueAddress,
        purchaseId,
        purchaseDays,
      })
      // console.log('signedAndUPDOrders>>>>>>>>>>>>', purchaseId, orderParts)
      const newOrder = {
        ...order,
        signature58: orderParts.signature58,
      }

      let newOrderList = await updOrderSignature58(
        selectedAddress,
        orderList,
        newOrder
      )

      dispatch(updateOrderList(newOrderList))
    },
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(OrderPage)
