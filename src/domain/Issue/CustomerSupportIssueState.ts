export default class CustomerSupportIssueState {
  private _value: string

  public static readonly OPENED = 'OPENED'

  public static readonly ASSIGNED = 'ASSIGNED'

  public static readonly RESOLVED = 'RESOLVED'

  private constructor() {

  }

  public static fromString(value: string): CustomerSupportIssueState {
    const allowed = [
      this.OPENED,
      this.ASSIGNED,
      this.RESOLVED,
    ]
    if (!allowed.includes(value)) {
      throw TypeError('Invalid availability value')
    }
    const instance = new this()
    instance._value = value
    return instance
  }

  public static opened(): CustomerSupportIssueState {
    return this.fromString(this.OPENED)
  }

  public static assigned(): CustomerSupportIssueState {
    return this.fromString(this.ASSIGNED)
  }

  public static resolved(): CustomerSupportIssueState {
    return this.fromString(this.RESOLVED)
  }

  isOpen(): boolean {
    return this._value === CustomerSupportIssueState.OPENED
  }

  isAssigned(): boolean {
    return this._value === CustomerSupportIssueState.ASSIGNED
  }

  isResolved(): boolean {
    return this._value === CustomerSupportIssueState.RESOLVED
  }

  get value(): string {
    return this._value
  }
}
