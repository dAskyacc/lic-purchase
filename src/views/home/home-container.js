import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import HomePage from './home-comp'

import {
  setConnectedAddress,
  setChainId,
} from '~/store/actions/metamask-actions'
import { getConnectedAddress, getMMChainId } from '~Lib/metamask'

import {
  chainSupported,
  findNetworkByChainId,
  KOVAN_CHAIN_NAME,
} from '~/lib/networks'

/**
 *
 * @module: home
 * @Created:  21-08-02 16:44 Monday
 * make state inject into react dom props
 *
 */
const mapStateToProps = (state) => {
  // global state contains skinState ... ed.
  const {
    skinState: { header },
    mmState,
  } = state

  return {
    header,
    mmState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    connectMetaMask: (selectedAddress) => {
      dispatch(setConnectedAddress(selectedAddress))

      return true
    },
    toPurchaseLicense: async ({ installed }) => {
      let chainId = getMMChainId()

      dispatch(setChainId(chainId))

      let selectedAddress = await getConnectedAddress()
      dispatch(setConnectedAddress(selectedAddress))

      if (!chainSupported(chainId)) {
        const nw = findNetworkByChainId(chainId)
        throw new Error(
          `当前网络 ${
            nw ? nw.text : chainId
          } 不支持,请通过MetaMask 切换到${KOVAN_CHAIN_NAME}.`
        )
      }

      const address = await getConnectedAddress()
      if (!address) throw new Error('当前未连接账号.')
      return true
    },
    // doSomeThing:(arg1,arg2) => (dispatch) => {
    //   ...
    //   dispatch(action);
    // },
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage)
