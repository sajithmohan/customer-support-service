import { isString } from 'lodash'

class CustomerSupportIssueTitle {
  private _value: string

  private constructor() {

  }

  public static fromString(value: string): CustomerSupportIssueTitle {
    if (!isString(value) || value.length === 0) {
      throw new TypeError('CustomerSupportIssueTitle must be a non empty string')
    }
    const instance = new this()
    instance._value = value
    return instance
  }

  get value(): string {
    return this._value
  }
}

export default CustomerSupportIssueTitle
