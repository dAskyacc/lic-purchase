import { WEB3_ERROR } from './error-names'
import { WEB3_ERROR_CODE } from './error-codes'

/**
 * 
 * @See https://eips.ethereum.org/EIPS/eip-1193
 */
export default class Web3Error extends Error {
  constructor(message = 'Web3 unknow error', code = WEB3_ERROR_CODE, data) {
    super(message)
    this.code = code
    this.name = WEB3_ERROR
    this.data = data
  }
}
