import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import HomePage from './home-comp'

import { setConnectedAddress } from '~/store/actions/metamask-actions'

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
