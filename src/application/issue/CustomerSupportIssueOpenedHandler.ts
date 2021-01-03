import CustomerSupportIssueReported from '@domain/Issue/CustomerSupportIssueReported'
import Handler from 'utils/messaging/Handler'
import MessageBus from 'utils/messaging/MessageBus'
import AssignAvailableAgentToIssue from '@application/issue/AssignAvailableAgentToIssue'

class CustomerSupportIssueReportedHandler implements Handler<CustomerSupportIssueReported> {
  constructor(
    private _commandBus: MessageBus,
  ) {

  }

  async handle(message: CustomerSupportIssueReported): Promise<void> {
    await this._commandBus.publish(
      AssignAvailableAgentToIssue.for(message.id),
    )
  }
}

export default CustomerSupportIssueReportedHandler
