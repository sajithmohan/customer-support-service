import Message from 'utils/messaging/Message'
import CustomerSupportIssueId from './CustomerSupportIssueId'
import CustomerSupportAgentId from '../CustomerSupportAgent/CustomerSupportAgentId'

class CustomerSupportIssueAssigned extends Message {
  public static to(
    id: CustomerSupportIssueId,
    agentId: CustomerSupportAgentId,
  ): CustomerSupportIssueAssigned {
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

export default CustomerSupportIssueAssigned
