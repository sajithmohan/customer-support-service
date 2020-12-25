import CustomerSupportAgentId from '@domain/CustomerSupportAgent/CustomerSupportAgentId'
import Message from 'utils/messaging/Message'

class AssignAvailableIssueToAgent extends Message {
  public static for(id: CustomerSupportAgentId): AssignAvailableIssueToAgent {
    return new this({
      id: id.value,
    })
  }

  get id():CustomerSupportAgentId {
    return CustomerSupportAgentId.fromString(this.payload.id)
  }
}

export default AssignAvailableIssueToAgent
