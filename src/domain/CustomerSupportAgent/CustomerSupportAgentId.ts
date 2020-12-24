import { isString } from 'lodash'

export default class CustomerSupportAgentId {
  private _value: string

  private constructor() {

  }

  public static fromString(value: string): CustomerSupportAgentId {
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
}
