import React, { Component } from 'react'
import { Layout } from 'antd'

import { Switch, Route } from 'react-router-dom'

import comboRoutes, {
  ERROR_PAGE_ROOT,
  ERROR_404_NESTED,
} from '~Router/routes-cnsts'

import TopHeader from '../top-header'
import NavFooter from '~/foot/footer'
import { UnfoundPage } from '~/errors/unfound-404'

const { Content } = Layout
export default class ErrorLayoutComp extends Component {
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

  render() {
    // const { xxx } = this.props

    return (
      <Layout>
        <TopHeader />
        <Content>
          <Switch>
            <Route
              path={comboRoutes(ERROR_PAGE_ROOT, ERROR_404_NESTED)}
              component={UnfoundPage}
            />
            <Route component={UnfoundPage} />
          </Switch>
        </Content>
        <NavFooter />
      </Layout>
    )
  }
}
