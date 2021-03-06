import CustomerSupportAgentAvailability from '@domain/CustomerSupportAgent/CustomerSupportAgentAvailability'
import CustomerSupportAgentId from '@domain/CustomerSupportAgent/CustomerSupportAgentId'
import AggregateRoot from '../AggregateRoot'
import CustomerSupportAgentJoined from './CustomerSupportAgentJoined'
import CustomerSupportAgentBecameAvailable from './CustomerSupportAgentBecameAvailable'

export default class CustomerSupportAgent extends AggregateRoot {
  private _id: CustomerSupportAgentId

  private _availability: CustomerSupportAgentAvailability

  private constructor() {
    super()
  }

  public static join(id: CustomerSupportAgentId): CustomerSupportAgent {
    if (!(id instanceof CustomerSupportAgentId)) {
      throw TypeError('id must be instance of CustomerSupportAgentId')
    }
    const instance = new this()
    instance._id = id
    instance._availability = CustomerSupportAgentAvailability.available()
    instance.addToDomainEvents(CustomerSupportAgentJoined.with(instance._id))
    return instance
  }

  public makeAssigned(): void {
    this._availability = CustomerSupportAgentAvailability.assigned()
    // TODO: instance.addToDomainEvents(CustomerSupportAgentAssignedToAnIssue)
  }

  public makeAvailable(): void {
    this._availability = CustomerSupportAgentAvailability.available()
    this.addToDomainEvents(CustomerSupportAgentBecameAvailable.with(this.id))
  }

  public release(): void {
    this._availability = CustomerSupportAgentAvailability.available()
  }

  // TODO: leave()

  get id(): CustomerSupportAgentId {
    return this._id
  }

  get availability(): CustomerSupportAgentAvailability {
    return this._availability
  }

  public static fromData(
    id: CustomerSupportAgentId,
    availability: CustomerSupportAgentAvailability,
  ): CustomerSupportAgent {
    const instance = new this()
    instance._id = id
    instance._availability = availability
    return instance
  }
}
