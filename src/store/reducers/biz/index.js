import { SET_HAS_METAMAK, SET_METAMASK_CHAINID } from '../../core-action-types'

export default function reduceBiz(state = {}, [type, val]) {
  const bizState = {
    metamask: {
      installed: false,
      chainId: 0x0,
    },
    ...state,
  }

  switch (type) {
    case SET_HAS_METAMAK: {
      bizState.metamask.installed = Boolean(val)

      return bizState
    }
    case SET_METAMASK_CHAINID: {
      bizState.metamask.chainId = val
      return bizState
    }
    default:
      return bizState
  }
}
