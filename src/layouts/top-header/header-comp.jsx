import React, { Component } from 'react'

import { Avatar, Image, Button } from 'antd'

import { Header } from 'antd/lib/layout/layout'
import { chainSupported, findNetworkByChainId } from '~/lib/networks'

import Logo from '~Assets/icons/logo.png'
import { ORDERS_PAGE_NESTED } from '~Router/routes-cnsts'

import { goHome } from '~Router/index'

export default class HeaderComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // a: 1,
    }
  }

  componentDidMount() {
    // there regist something handle.
    // console.log('mmState', this.props.mmState)
    // const { mmState, checkMetaMaskEnv } = this.props
    // checkMetaMaskEnv(mmState)
  }

  componentWillUnmount() {
    // there unregist something handle.
  }

  renderLogo() {
    const { location, history } = this.props
    const { installed, chainId, selectedAddress } = this.props.mmState

    const networkEnabled = chainSupported(chainId)
    const nw = findNetworkByChainId(chainId)
    const networkFullName = nw ? nw.text : chainId
    return (
      <div className='nav-head-logo'>
        <Avatar
          size={40}
          src={<Image src={Logo} preview={false} />}
          onClick={() => {
            goHome(history, location)
          }}
        ></Avatar>

        {installed ? (
          <div className='nav-metamask-state'>
            <span
              className={
                networkEnabled ? 'network' : 'network network-disabled'
              }
            >
              {networkFullName}
            </span>
            <span className='selected-address'>{selectedAddress}</span>
          </div>
        ) : null}
      </div>
    )
  }

  renderNavMenus() {
    const { chainId, selectedAddress } = this.props.mmState
    return (
      <div className='nav-head-menus'>
        {/* <span>{chainId}</span>
        <span>{selectedAddress}</span> */}
      </div>
    )
  }

  gotoPage = (path) => {
    const { location, history, mmState } = this.props
    // console.log('>>>>>>>>>>>>>>>', path, location, mmState)
    if (
      location.pathname !== path &&
      history &&
      chainSupported(mmState.chainId)
    ) {
      history.push(path)
    }
  }

  renderActions() {
    const { isMobile, isBrowser } = this.props
    const { chainId } = this.props.mmState
    const networkEnabled = chainSupported(chainId)
    return (
      <div className='nav-head-actions'>
        {networkEnabled && isBrowser ? (
          <span
            className='navact-menu'
            onClick={this.gotoPage.bind(this, ORDERS_PAGE_NESTED)}
          >
            订单
          </span>
        ) : null}
        {/* <span className='navact-menu network'>帮助</span> */}
      </div>
    )
  }

  render() {
    // const { xxx } = this.props

    return (
      <Header className='nav-head'>
        {this.renderLogo()}
        {this.renderNavMenus()}
        {this.renderActions()}
      </Header>
    )
  }
}
