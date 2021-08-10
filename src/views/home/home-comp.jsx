import React, { Component } from 'react'

import BraveIcon from '~UI/brave-icon'

export default class HomeComp extends Component {
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

  renderHeader() {
    return (
      <div className='home__header'>
        <h1>欢迎使用</h1>
      </div>
    )
  }

  renderContent() {
    return (
      <div className='home__content'>
        <div className='downlaod-btn'>
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

  renderFooter() {
    return (
      <div className='home__bottom'>
        <div className='downlaod-btn purchase-lic'>
          <span className='btn-text'>订购 License</span>
        </div>
      </div>
    )
  }

  render() {
    // const { xxx } = this.props

    return (
      <div className='home-container'>
        <div className='inner'>
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}
