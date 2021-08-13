import { TOKEN_SOLNAME } from '../../contracts/sc-map'
import { getCreateContractParam } from '../../contracts'

export const DEFAULT_ALLOWANCE_COIN = '20000000'
export const CHECK_MIN_ALLOWANCE_COIN = '30'

export const getNCCTokenInst = (web3js, chainId, from) => {
  let opts = { from }
  const { abi, contractAddress } = getCreateContractParam(
    TOKEN_SOLNAME,
    chainId
  )

  return new web3js.eth.Contract(abi, contractAddress, opts)
}
