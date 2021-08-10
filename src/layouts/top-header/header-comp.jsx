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
  }

  componentWillUnmount() {
    // there unregist something handle.
  }

  renderLogo() {
    return (
      <span className='nav-head-logo'>
        <Avatar size={40} src={<Image src={Logo} preview={false} />}></Avatar>
      </span>
    )
  }

  renderNavMenus() {
    return <div className='nav-head-menus'></div>
  }

  renderActions() {
    return (
      <div className='nav-head-actions'>
        <span className='network'>Ropsten</span>
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
