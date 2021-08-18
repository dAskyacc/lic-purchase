import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import HeaderPage from './header-comp'

import { getMMChainId } from '~Lib/metamask'
import {
  setChainId,
  setConnectedAddress,
} from '~Store/actions/metamask-actions'
/**
 *
 * @module: top-header
 * @Created:  21-08-10 19:46 Tuesday
 * make state inject into react dom props
 *
 */
const mapStateToProps = (state) => {
  // global state contains skinState ... ed.
  const {
    skinState: { isMobile, isBrowser },
    mmState,
  } = state

  return {
    mmState,
    isMobile,
    isBrowser,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkMetaMaskEnv: ({ installed, chianId }) => {
      if (installed) {
        const chainId = getMMChainId()
        dispatch(setChainId(chainId))
        if (ethereum.selectedAddress) {
          dispatch(setConnectedAddress(ethereum.selectedAddress))
        }
      }
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
)(HeaderPage)
