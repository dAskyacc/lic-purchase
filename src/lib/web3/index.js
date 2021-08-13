import Web3 from 'web3'

import BizError, { EthereumError } from '../errors'
import { getMetaMaskProvider } from '../metamask/provider'
import { getConnectedAddress, validEthereum } from '../metamask'
import { KOVAN_CHAINID } from '../networks/chain-types'
import ERR_MSG_MAP, {
  UNSUPPORT_NETWORK,
  NO_CONNECTED_ACCOUNT,
} from '../errors/error-codes'

export async function getWeb3Inst(provider) {
  let _provider = provider || (await getMetaMaskProvider())

  return new Web3(_provider)
}

/**
 *
 * @param {Object} web3js required
 * @param {Object} param1 [address,abi,from]
 * @returns
 */
export function getContractInst(web3js, { abi, address, from }) {
  const opts = {
    from,
  }
  return new web3js.eth.Contract(abi, address, opts)
}

export async function checkKovanChainState() {
  validEthereum()
  const chainId = window.ethereum.chainId
  const selectedAddress = window.ethereum.selectedAddress
  if (parseInt(chainId) !== KOVAN_CHAINID)
    throw new BizError(ERR_MSG_MAP[UNSUPPORT_NETWORK], UNSUPPORT_NETWORK)

  if (!selectedAddress) {
    selectedAddress = await getConnectedAddress()
  }
  return {
    chainId: chainId,
    selectedAddress: selectedAddress,
  }
}

export default checkKovanChainState
