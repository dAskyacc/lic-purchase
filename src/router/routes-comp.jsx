import React, { PureComponent } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import {
  ROOT_PATH,
  HOME_INDEX_ROOT,
  PAGE_NESTED_ROOT,
  ERROR_PAGE_ROOT,
} from './routes-cnsts'

import HomeLayout from '~Layouts/home-layout'

import PageLayout from '~Layouts/page-layout'

import ErrorLayout from '~Layouts/error-layout'

export default class RoutesComp extends PureComponent {
  state = {}

  render() {
    return (
      <Switch>
        <Route
          path={ROOT_PATH}
          exact
          render={() => <Redirect to={HOME_INDEX_ROOT} />}
        ></Route>
        <Route path={PAGE_NESTED_ROOT} component={PageLayout} />
        <Route path={HOME_INDEX_ROOT} component={HomeLayout} />
        {/* <Route path={HOME_SCAN_ROOT} exact component={ScanPage} /> */}

        {/* <Route path={HOME_INDEX_ROOT} children={HomeTabRouter}>

        </Route> */}

        <Route component={ErrorLayout} />

        {/* <Redirect to={ROOT_PATH} /> */}
      </Switch>
    )
  }
}
