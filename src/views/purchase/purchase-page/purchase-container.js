import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PurchasePage from './purchase-comp'

import { etherscanUrl, KOVAN_CHAIN_NAME } from '~Lib/networks'

/**
 *
 * @module: purchase/purchase-page
 * @Created:  21-08-11 20:34 Wednesday
 * make state inject into react dom props
 *
 */
const mapStateToProps = (state) => {
  // global state contains skinState ... ed.
  const {
    skinState: { header },
    mmState,
  } = state

  const { chainId } = mmState

  return {
    header,
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
    // doSomeThing:(arg1,arg2) => (dispatch) => {
    //   ...
    //   dispatch(action);
    // },
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(PurchasePage)
