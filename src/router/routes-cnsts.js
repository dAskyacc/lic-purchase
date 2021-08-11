export const ROOT_PATH = '/'

export const HOME_INDEX_ROOT = '/index'
export const PURCHASE_PAGE_NESTED = '/purchase'
export const HOME_PROFILE_ROOT = '/profile'
export const HOME_USER_ROOT = '/user'

export const PAGE_NESTED_ROOT = '/p'

export const ERROR_PAGE_ROOT = '/err'
export const ERROR_404_NESTED = '/404'

export const comboRoutes = (...routes) => {
  routes = routes
    .map((r) => {
      if (r.endsWith('/')) {
        return r.slice(0, r.length - 1)
      } else {
        return r
      }
    })
    .map((r, idx) => (!r.startsWith('/') && idx ? `/${r}` : r))
  return routes.join('')
}

export default comboRoutes
