import { isString } from 'lodash'

class CustomerSupportIssueDescription {
  private _value: string

  private constructor() {

  }

  public static fromString(value: string): CustomerSupportIssueDescription {
    if (!isString(value) || value.length === 0) {
      throw new TypeError('CustomerSupportIssueDescription must be a non empty string')
    }
    const instance = new this()
    instance._value = value
    return instance
  }

  get value(): string {
    return this._value
  }
}

export default CustomerSupportIssueDescription
