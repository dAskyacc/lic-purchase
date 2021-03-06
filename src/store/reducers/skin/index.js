import { isMobile, isBrowser } from 'react-device-detect'
import { SET_PAGE_HEADER_TITLE } from '../../core-action-types'

export default function reduceSkin(state = {}, { type, val }) {
  const skinState = {
    isMobile: isMobile || false,
    isBrowser,
    header: {
      pageTitle: '',
    },
    ...state,
  }

  switch (type) {
    case SET_PAGE_HEADER_TITLE: {
      const header = {
        ...skinState.header,
        pageTitle: val,
      }
      return {
        ...skinState,
        header,
      }
    }
    default:
      return skinState
  }
}
