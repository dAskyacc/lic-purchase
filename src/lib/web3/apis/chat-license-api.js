import { LICENSE_SOLNAME } from '../../contracts/sc-map'
import { getCreateContractParam } from '../../contracts'

export const getChatLicenseSCInst = (web3js, chainId, from) => {
  let opts = { from }
  const { abi, contractAddress } = getCreateContractParam(
    LICENSE_SOLNAME,
    chainId
  )

  return new web3js.eth.Contract(abi, contractAddress, opts)
}

export default getChatLicenseSCInst
