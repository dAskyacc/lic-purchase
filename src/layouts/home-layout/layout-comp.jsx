import React, { Component } from 'react'
import { Layout } from 'antd'

import { Switch, Route } from 'react-router-dom'

import BraveIcon from '~UI/brave-icon'

import comboRoutes, {
  HOME_INDEX_ROOT,
  ORDERS_PAGE_NESTED,
  ERROR_404_NESTED,
  PURCHASE_PAGE_NESTED,
} from '~Router/routes-cnsts'

import TopHeader from '../top-header'
import NavFooter from '~/foot/footer'

import HomePage from '~Views/home'

import { UnfoundPage } from '~/errors/unfound-404'
import PurchasePage from '~Views/purchase/purchase-page'
import OrderIndexPage from '~Views/purchase/orders'

const { Content } = Layout

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
      <Layout className='home-layout'>
        <TopHeader />
        <Content>
          <Switch>
            <Route path={HOME_INDEX_ROOT} component={HomePage} exact />

            <Route path={PURCHASE_PAGE_NESTED} component={PurchasePage} exact />
            <Route path={ORDERS_PAGE_NESTED} component={OrderIndexPage} exact />
            <Route path={ERROR_404_NESTED} component={UnfoundPage} />
          </Switch>
        </Content>
        <NavFooter />
      </Layout>
    )
  }
}
