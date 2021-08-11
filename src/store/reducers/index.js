import { combineReducers } from 'redux'

import { connectRouter } from 'connected-react-router'
import skinStateReducer from './skin'
import mmStateReducer from './metamask'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    skinState: skinStateReducer,
    mmState: mmStateReducer,
  })

export default createRootReducer
