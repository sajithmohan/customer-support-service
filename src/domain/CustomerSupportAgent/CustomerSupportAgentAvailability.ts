export default class CustomerSupportAgentAvailability {
  private _value: string

  public static readonly AVAILABLE = 'AVAILABLE'

  public static readonly ASSIGNED = 'ASSIGNED'

  private constructor() {

  }

  public static fromString(value: string): CustomerSupportAgentAvailability {
    const allowed = [
      this.AVAILABLE,
      this.ASSIGNED,
    ]
    if (!allowed.includes(value)) {
      throw TypeError('Invalid availability value')
    }
    const instance = new this()
    instance._value = value
    return instance
  }

  public static available(): CustomerSupportAgentAvailability {
    return this.fromString(this.AVAILABLE)
  }

  public static assigned(): CustomerSupportAgentAvailability {
    return this.fromString(this.ASSIGNED)
  }

  isAvailable(): boolean {
    return this._value === CustomerSupportAgentAvailability.AVAILABLE
  }

  isAssigned(): boolean {
    return this._value === CustomerSupportAgentAvailability.ASSIGNED
  }

  get value(): string {
    return this._value
  }
}
