import React, { Component } from 'react'

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
    return <div className='layout__header'> Layout Header</div>
  }

  renderContent() {
    return <div className='layout__content'>Layout Content</div>
  }

  renderFooter() {
    return <div className='layout__footer'>Layout Footer</div>
  }

  render() {
    // const { xxx } = this.props

    return (
      <div className='layout'>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    )
  }
}
