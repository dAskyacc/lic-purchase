import React, { Component } from 'react'

import { Image } from 'antd'

import { Footer } from 'antd/lib/layout/layout'

import footLogo from '~Assets/images/s-logo.gif'
import Avatar from 'antd/lib/avatar/avatar'

export default class NavFooterComp extends Component {
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

  renderLeft() {
    return (
      <div className='nav-footer__left'>
        <Avatar
          className='nav-footer-logo'
          icon={<Image src={footLogo} preview={false} />}
        ></Avatar>
        <div className='logo-r'>
          <span className='nav-footer__title'>XXXX</span>
          <span className='nav-footer__subtitle'>还是大航海时代和</span>
        </div>
      </div>
    )
  }

  renderContent() {
    return (
      <div className='nav-footer__content'>
        <span className='cpy'>
          Copyright © 2020-2021 NinJa. All Rights Reserved.
        </span>
      </div>
    )
  }

  renderRight() {
    return <div className='nav-footer__footer'>NavFooter Footer</div>
  }

  render() {
    // const { xxx } = this.props

    return (
      <Footer className='nav-footer'>
        {/* {this.renderLeft()} */}
        {this.renderContent()}
        {/* {this.renderRight()} */}
      </Footer>
    )
  }
}
