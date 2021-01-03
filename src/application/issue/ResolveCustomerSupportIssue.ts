import Message from 'utils/messaging/Message'
import CustomerSupportIssueId from '@domain/Issue/CustomerSupportIssueId'

class ResolveCustomerSupportIssue extends Message {
  public static createFrom(
    id: CustomerSupportIssueId,
  ): ResolveCustomerSupportIssue {
    return new this({
      id: id.value,
    })
  }

  get id(): CustomerSupportIssueId {
    return CustomerSupportIssueId.fromString(this.payload.id)
  }
}

export default ResolveCustomerSupportIssue
