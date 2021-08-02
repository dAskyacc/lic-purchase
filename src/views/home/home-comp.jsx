import React, { Component } from 'react'

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
    return <div className='home__header'> Home Header</div>
  }

  renderContent() {
    return <div className='home__content'>Home Content</div>
  }

  renderFooter() {
    return <div className='home__footer'>Home Footer</div>
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
