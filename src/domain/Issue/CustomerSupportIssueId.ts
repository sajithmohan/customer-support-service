import { isString } from 'lodash'
import { v4 as uuid } from 'uuid'

class CustomerSupportIssueId {
  private _value: string

  private constructor() {

  }

  public static fromString(value: string): CustomerSupportIssueId {
    if (!isString(value) || value.length === 0) {
      throw new TypeError('CustomerSupportAgentId must be a non empty string')
    }
    const instance = new this()
    instance._value = value
    return instance
  }

  get value(): string {
    return this._value
  }

  static generate():CustomerSupportIssueId {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return CustomerSupportIssueId.fromString(uuid())
  }
}

export default CustomerSupportIssueId
