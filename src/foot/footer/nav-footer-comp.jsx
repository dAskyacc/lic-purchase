import React, { Component } from 'react'

import { Image, Button } from 'antd'

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

  gotoFaucet() {
    window.open('https://linkfaucet.protofire.io/kovan', 'Faucet')
  }

  renderLeft() {
    return (
      <div className='nav-foot__left'>
        <Avatar
          className='nav-foot-logo'
          icon={<Image src={footLogo} preview={false} />}
        ></Avatar>
        <div className='logo-r'>
          <span className='nav-foot__title'>XXXX</span>
          <span className='nav-foot__subtitle'>还是大航海时代和</span>
        </div>
      </div>
    )
  }

  renderContent() {
    const { isBrowser } = this.props
    return (
      <div className='nav-foot__content'>
        <span className='cpy'>
          Copyright © 2020-2021 Agent. All Rights Reserved.
        </span>

        {isBrowser ? (
          <Button
            type='text'
            className='nav-foot-btn'
            size='small'
            onClick={this.gotoFaucet}
          >
            获取Gas费
          </Button>
        ) : null}
      </div>
    )
  }

  renderRight() {
    return <div className='nav-foot__footer'>NavFooter Footer</div>
  }

  render() {
    // const { xxx } = this.props

    return (
      <Footer className='nav-foot'>
        {/* {this.renderLeft()} */}
        {this.renderContent()}
        {/* {this.renderRight()} */}
      </Footer>
    )
  }
}
