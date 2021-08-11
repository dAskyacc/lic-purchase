import { ETHEREUM_ERROR } from './error-names'
import { ETHEREUM_UNDEFINED_CODE } from './error-codes'

export class EthereumUndefined extends TypeError {
  constructor(message = 'unfound ethereum in browser enviroment') {
    super(message)
    this.code = ETHEREUM_UNDEFINED_CODE
    this.name = ETHEREUM_ERROR
  }

  errorString() {
    return `${this.name}: ${this.message}[${this.code}]`
  }
}
