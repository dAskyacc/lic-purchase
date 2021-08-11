import React, { Component } from 'react'

import { Avatar, Image, Button } from 'antd'

import { Header } from 'antd/lib/layout/layout'

import Logo from '~Assets/icons/logo.png'

export default class HeaderComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // a: 1,
    }
  }

  componentDidMount() {
    // there regist something handle.
    console.log('mmState', this.props.mmState)
  }

  componentWillUnmount() {
    // there unregist something handle.
  }

  renderLogo() {
    const { installed, chainId, selectedAddress } = this.props.mmState
    return (
      <div className='nav-head-logo'>
        <Avatar size={40} src={<Image src={Logo} preview={false} />}></Avatar>

        {installed ? (
          <div className='nav-metamask-state'>
            <span className='network'>Ropsten {chainId}</span>
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

  renderActions() {
    return (
      <div className='nav-head-actions'>
        <span className='network'>帮助</span>
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
