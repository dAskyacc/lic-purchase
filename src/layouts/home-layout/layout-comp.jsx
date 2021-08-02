import React, { Component } from 'react'

import BraveIcon from '~UI/brave-icon'

export default class LayoutComp extends Component {
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
    return <div className='home__header'> Layout ssfdfs Header</div>
  }

  renderContent() {
    return (
      <div className='home__content'>
        Layout Content
        <BraveIcon type='brave-android' />
      </div>
    )
  }

  renderFooter() {
    return <div className='home__footer'>Layout Footer</div>
  }

  render() {
    // const { xxx } = this.props

    return (
      <div className='home'>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    )
  }
}
