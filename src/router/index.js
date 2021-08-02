import { useHistory, Redirect } from 'react-router-dom'

import { ROOT_PATH } from './routes-cnsts'
export { default } from './routes-comp'

export const RouteFallRedirectRoot = (props = {}) => {
  const history = useHistory()
  let { location } = props
  if (!location && history.location) location = history.location

  return <Redirect to={{ pathname: ROOT_PATH, from: location }} />
}
