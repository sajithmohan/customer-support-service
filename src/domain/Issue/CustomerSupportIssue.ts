import CustomerSupportIssueTitle from '@domain/Issue/CustomerSupportIssueTitle'
import CustomerSupportAgent from '@domain/CustomerSupportAgent/CustomerSupportAgent'
import CustomerSupportIssueAssigned from '@domain/Issue/CustomerSupportIssueAssigned'
import AggregateRoot from '../AggregateRoot'
import CustomerId from '../CustomerId'
import CustomerSupportIssueDescription from './CustomerSupportIssueDescription'
import CustomerSupportIssueOpened from './CustomerSupportIssueOpened'
import CustomerSupportIssueState from './CustomerSupportIssueState'
import CustomerSupportIssueId from './CustomerSupportIssueId'
import CustomerSupportAgentId from '../CustomerSupportAgent/CustomerSupportAgentId'

class CustomerSupportIssue extends AggregateRoot {
  private _id: CustomerSupportIssueId

  private _customerId: CustomerId

  private _title: CustomerSupportIssueTitle

  private _description: CustomerSupportIssueDescription

  private _state: CustomerSupportIssueState

  private _assignedToId: CustomerSupportAgentId | null = null

  private constructor() {
    super()
  }

  public static Open(
    customerId: CustomerId,
    title: CustomerSupportIssueTitle,
    description: CustomerSupportIssueDescription,
  ): CustomerSupportIssue {
    const id = CustomerSupportIssueId.generate()
    const instance = new this()
    instance._id = id
    instance._customerId = customerId
    instance._title = title
    instance._description = description
    instance._state = CustomerSupportIssueState.opened()
    instance.addToDomainEvents(CustomerSupportIssueOpened.with(
      id,
      customerId,
      title,
      description,
    ))
    return instance
  }

  public assignCustomerSupportAgent(agentId: CustomerSupportAgentId): void {
    this._assignedToId = agentId
    this._state = CustomerSupportIssueState.assigned()
    this.addToDomainEvents(CustomerSupportIssueAssigned.to(this.id, agentId))
  }

  public get id(): CustomerSupportIssueId {
    return this._id
  }

  public get customerId(): CustomerId {
    return this._customerId
  }

  public get title(): CustomerSupportIssueTitle {
    return this._title
  }

  public get description(): CustomerSupportIssueDescription {
    return this._description
  }

  public get state(): CustomerSupportIssueState {
    return this._state
  }

  public get assignedAgentId(): CustomerSupportAgentId | null {
    return this._assignedToId
  }

  public static fromData(
    id: CustomerSupportIssueId,
    customerId: CustomerId,
    title: CustomerSupportIssueTitle,
    description: CustomerSupportIssueDescription,
    state: CustomerSupportIssueState,
    assignedToId: CustomerSupportAgentId | null,
  ) : CustomerSupportIssue {
    const instance = new this()
    instance._id = id
    instance._customerId = customerId
    instance._title = title
    instance._description = description
    instance._state = state
    instance._assignedToId = assignedToId
    return instance
  }
}

export default CustomerSupportIssue
