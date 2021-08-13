import BizError from '../errors'
import abis from './abis'
import addresses from './addresses'

import { NO_CONTRACT_ABI, NO_CONTRACT_ADDRESS } from '../errors/error-codes'

export function getCreateContractParam(contractName, chainId) {
  if (!contractName || !chainId)
    throw new TypeError('contractName and chainId required.')

  let _chainId = typeof chainId === 'string' ? parseInt(chainId) : chainId

  let abi = abis[contractName] || null
  let contractAddress =
    addresses[_chainId] && addresses[_chainId][contractName]
      ? addresses[_chainId][contractName]
      : ''

  if (!abi)
    throw new BizError(`Contract [${contractName}] unset abi`, NO_CONTRACT_ABI)

  if (!contractAddress)
    throw BizError(
      `Contract [${contractName}] at chain [${chainId}] unset address.`,
      NO_CONTRACT_ADDRESS
    )
  return { abi, contractAddress }
}

export { default } from './sc-map'
