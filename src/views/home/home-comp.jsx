import React, { Component } from 'react'

import BraveIcon from '~UI/brave-icon'

import { getUUID32Hex } from '~/lib/utils'

import { successToast, infoToast, errorToast } from '~/ui/ant-toast'

import { getConnectedAddress } from '~Lib/metamask'

export default class HomeComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // a: 1,
    }
  }

  componentDidMount() {
    // there regist something handle.
    const { mmState } = this.props

    console.log('>>>>>>>>>>>>>>>>>>>>>>componentDidMount>>>>>>>>>>', mmState)
  }

  componentWillUnmount() {
    // there unregist something handle.
    const { mmState } = this.props

    console.log('>>>>>>>>>>>>>>componentWillUnmount>>>>>>>>>>>>>>>>>>', mmState)
  }

  renderHeader() {
    return (
      <div className='home__header'>
        <h1>欢迎使用</h1>
      </div>
    )
  }

  testhandle = (name) => {
    console.log('Name>>>', name, getUUID32Hex())
  }

  connectMetaMask = async () => {
    // successToast('Success')
    // infoToast('info')
    const { connectMetaMask } = this.props
    try {
      const address = await getConnectedAddress()
      connectMetaMask(address)
    } catch (err) {
      let errMsg = err.message
      if (err.code) {
        errMsg += `[${err.code}]`
      }
      errorToast(errMsg)
    }
  }

  renderContent() {
    return (
      <div className='home__content'>
        <div className='downlaod-btn'>
          <BraveIcon type='brave-ios' />
          <span
            className='btn-text'
            onClick={this.testhandle.bind(this, 'ios')}
          >
            ios
          </span>
        </div>
        <div className='downlaod-btn'>
          <BraveIcon type='brave-android' />
          <span className='btn-text'>android</span>
        </div>
      </div>
    )
  }

  renderPurchase() {
    return (
      <div className='home__bottom'>
        <div
          className='downlaod-btn purchase-lic'
          onClick={this.connectMetaMask.bind(this)}
        >
          <span className='btn-text'>订购 License</span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='home-container'>
        <div className='inner'>
          {this.renderHeader()}
          {this.renderPurchase()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
