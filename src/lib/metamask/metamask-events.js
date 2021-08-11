import { setChainId } from '~/store/actions/metamask-actions'

export const startMetaMaskChainChangedListener = (store, action) => {
  if (
    typeof store === 'object' &&
    store.dispatch &&
    typeof action === 'function' &&
    window.ethereum &&
    window.ethereum.isMetaMask
  ) {
    console.log('>>>>Start MetaMask chainChanged listener.....')
    window.ethereum.on('chainChanged', function (chainId) {
      console.log('MetaMask chainID changed: ', chainId)
      store.dispatch(setChainId(chainId))
    })
  }
}
