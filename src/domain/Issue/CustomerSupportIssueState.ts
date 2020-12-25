export default class CustomerSupportIssueState {
  private _value: string

  public static readonly OPENED = 'OPENED'

  public static readonly ASSIGNED = 'ASSIGNED'

  public static readonly COMPLETED = 'COMPLETED'

  private constructor() {

  }

  public static fromString(value: string): CustomerSupportIssueState {
    const allowed = [
      this.OPENED,
      this.ASSIGNED,
      this.COMPLETED,
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

  public static completed(): CustomerSupportIssueState {
    return this.fromString(this.COMPLETED)
  }

  isOpen(): boolean {
    return this._value === CustomerSupportIssueState.OPENED
  }

  isAssigned(): boolean {
    return this._value === CustomerSupportIssueState.ASSIGNED
  }

  isCompleted(): boolean {
    return this._value === CustomerSupportIssueState.COMPLETED
  }

  get value(): string {
    return this._value
  }
}
