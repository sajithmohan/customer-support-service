import CustomerSupportIssueOpened from '@domain/Issue/CustomerSupportIssueOpened'
import Handler from 'utils/messaging/Handler'
import MessageBus from 'utils/messaging/MessageBus'
import AssignAvailableAgentToIssue from '@application/issue/AssignAvailableAgentToIssue'

class CustomerSupportIssueOpenedHandler implements Handler<CustomerSupportIssueOpened> {
  constructor(
    private _commandBus: MessageBus,
  ) {

  }

  async handle(message: CustomerSupportIssueOpened): Promise<void> {
    await this._commandBus.publish(
      AssignAvailableAgentToIssue.for(message.id),
    )
  }
}

export default CustomerSupportIssueOpenedHandler
