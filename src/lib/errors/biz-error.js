import { BIZ_ERROR } from './error-names'
import { UNKNOW_EEROR_CODE } from './error-codes'


export default class BizError extends Error {
  constructor(message, code = UNKNOW_EEROR_CODE) {
    super(message)
    this.code = code

    this.name = BIZ_ERROR
  }

  errorString() {
    return `${this.name}: ${this.message}[${this.code}]`
  }
}
