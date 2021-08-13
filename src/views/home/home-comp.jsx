import React, { Component } from 'react'

import BraveIcon from '~UI/brave-icon'

import { getUUID32Hex } from '~/lib/utils'

import { successToast, infoToast, errorToast } from '~/ui/ant-toast'

import { getConnectedAddress } from '~Lib/metamask'

import { PURCHASE_PAGE_NESTED } from '~Router/routes-cnsts'
import { getMetaMaskProvider } from '~/lib/metamask/provider'
import { WEB3_REQUEST_AWAIT } from '~Lib/errors/error-codes'

// import { weiToEther } from '~Lib/web3/utils/token-utils'

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

    // console.log('>>>>>>>>>>>>>>>>>>>>>>componentDidMount>>>>>>>>>>', mmState)
  }

  componentWillUnmount() {
    // there unregist something handle.
    const { mmState } = this.props

    // console.log('>>>>>>>>>>>>>>componentWillUnmount>>>>>>>>>>>>>>>>>>', mmState)
  }

  renderHeader() {
    return (
      <div className='home__header'>
        <h1>欢迎使用</h1>
      </div>
    )
  }

  testhandle = async (name) => {
    const { location } = this.props
    try {
      const provider = await getMetaMaskProvider()
      console.log('>>>provider>>', provider)
    } catch (error) {
      console.log('>>>>>', error)
    }
  }

  connectMetaMask = async () => {
    // successToast('Success')
    // infoToast('info')
    const { toPurchaseLicense, mmState, history } = this.props
    try {
      const res = await toPurchaseLicense(mmState)
      // console.groupCollapsed('>>>>>>>>>>>>>>>>>>>', res)
      history.push(PURCHASE_PAGE_NESTED)
    } catch (err) {
      let errMsg = err.message
      if (err.code && err.code === WEB3_REQUEST_AWAIT) {
        errMsg = `请检查MetaMask插件是否有未处理请求,再试.`
        errMsg += `[${err.code}]`
      } else if (err.code && err.code !== WEB3_REQUEST_AWAIT) {
        errMsg += `[${err.code}]`
      }
      errorToast(errMsg)
    }
  }

  renderContent() {
    return (
      <div className='home__content'>
        <div
          className='downlaod-btn'
          onClick={this.testhandle.bind(this, 'ios')}
        >
          <BraveIcon type='brave-ios' />
          <span className='btn-text'>ios</span>
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
