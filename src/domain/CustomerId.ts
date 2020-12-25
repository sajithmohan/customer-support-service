import { isString } from 'lodash'

class CustomerId {
  private _value: string

  private constructor() {

  }

  public static fromString(value: string): CustomerId {
    if (!isString(value) || value.length === 0) {
      throw new TypeError('CustomerId must be a non empty string')
    }
    const instance = new this()
    instance._value = value
    return instance
  }

  get value(): string {
    return this._value
  }
}

export default CustomerId
