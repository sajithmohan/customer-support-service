import CustomerSupportIssueId from '@domain/Issue/CustomerSupportIssueId'
import Message from 'utils/messaging/Message'

class AssignAvailableAgentToIssue extends Message {
  public static for(id: CustomerSupportIssueId): AssignAvailableAgentToIssue {
    return new this({
      id: id.value,
    })
  }

  get id():CustomerSupportIssueId {
    return CustomerSupportIssueId.fromString(this.payload.id)
  }
}

export default AssignAvailableAgentToIssue
