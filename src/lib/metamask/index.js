import { EthereumError, Web3Error } from '../errors'

export function checkMetaMaskEnv() {
  return window.ethereum && window.ethereum.isMetaMask
}

export function getMMChainId() {
  return window.ethereum && window.ethereum.isMetaMask
    ? window.ethereum.chainId
    : '0x0'
}

export function getSelectedAddress() {
  return window.ethereum && window.ethereum.isMetaMask
    ? window.ethereum.selectedAddress
    : ''
}

/**
 * when user rejected request throw error.
 * @returns always connected address
 *
 */
export async function getConnectedAddress() {
  validEthereum()

  try {
    const addresses = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    return addresses[0]
  } catch (err) {
    if (err.code) {
      throw new Web3Error(err.message, err.code)
    } else {
      throw new Web3Error(err.message)
    }
  }
}

export function validEthereum() {
  if (!window.ethereum) throw new EthereumError()
  return window.ethereum
}

export default checkMetaMaskEnv
