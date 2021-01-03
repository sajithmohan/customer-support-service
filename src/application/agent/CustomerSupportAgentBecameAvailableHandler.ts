import AssignAvailableIssueToAgent from '@application/issue/AssignAvailableIssueToAgent'
import CustomerSupportAgentBecameAvailable from '@domain/CustomerSupportAgent/CustomerSupportAgentBecameAvailable'
import Handler from 'utils/messaging/Handler'
import MessageBus from 'utils/messaging/MessageBus'

// eslint-disable-next-line max-len
class CustomerSupportAgentBecameAvailableHandler implements Handler<CustomerSupportAgentBecameAvailable> {
  constructor(
    private _commandBus: MessageBus,
  ) {

  }

  async handle(message: CustomerSupportAgentBecameAvailable): Promise<void> {
    await this._commandBus.publish(
      AssignAvailableIssueToAgent.for(message.id),
    )
  }
}

export default CustomerSupportAgentBecameAvailableHandler
