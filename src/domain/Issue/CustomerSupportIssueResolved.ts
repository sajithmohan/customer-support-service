import Message from 'utils/messaging/Message'
import CustomerSupportIssueId from '@domain/Issue/CustomerSupportIssueId'
import CustomerSupportAgentId from '@domain/CustomerSupportAgent/CustomerSupportAgentId'

class CustomerSupportIssueResolved extends Message {
  public static with(
    id: CustomerSupportIssueId,
    agentId: CustomerSupportAgentId,
  ): CustomerSupportIssueResolved {
    return new this({
      id: id.value,
      agent_id: agentId.value,
    })
  }

  get id(): CustomerSupportIssueId {
    return CustomerSupportIssueId.fromString(this.payload.id)
  }

  get agentId(): CustomerSupportAgentId {
    return CustomerSupportAgentId.fromString(this.payload.agent_id)
  }
}

export default CustomerSupportIssueResolved
