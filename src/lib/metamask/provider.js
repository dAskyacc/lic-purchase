import detectEthereumProvider from '@metamask/detect-provider'
import { EthereumError } from '../errors'

export async function getMetaMaskProvider() {
  if (!window.ethereum || !window.ethereum.isMetaMask) throw new EthereumError()

  const _provider = await detectEthereumProvider({
    mustBeMetaMask: true,
    timeout: 3000,
  })

  if (!_provider) throw new EthereumError()

  window._mmInjectProvider = _provider
  return _provider
}
