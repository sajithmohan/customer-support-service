import AssignAvailableIssueToAgent from '@application/issue/AssignAvailableIssueToAgent'
import CustomerSupportAgentJoined from '@domain/CustomerSupportAgent/CustomerSupportAgentJoined'
import Handler from 'utils/messaging/Handler'
import MessageBus from 'utils/messaging/MessageBus'

class CustomerSupportAgentJoinedHandler implements Handler<CustomerSupportAgentJoined> {
  constructor(
    private _commandBus: MessageBus,
  ) {

  }

  async handle(message: CustomerSupportAgentJoined): Promise<void> {
    await this._commandBus.publish(
      AssignAvailableIssueToAgent.for(message.id),
    )
  }
}

export default CustomerSupportAgentJoinedHandler
