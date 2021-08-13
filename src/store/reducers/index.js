import { combineReducers } from 'redux'

import { connectRouter } from 'connected-react-router'
import skinStateReducer from './skin'
import mmStateReducer from './metamask'
import tokenStateReducer from './tokens'
import orderReducer from './biz/purchase-order'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    skinState: skinStateReducer,
    mmState: mmStateReducer,
    tokenState: tokenStateReducer,
    orderState: orderReducer,
  })

export default createRootReducer
