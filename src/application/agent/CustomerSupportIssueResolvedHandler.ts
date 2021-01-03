import CustomerSupportIssueResolved from '@domain/Issue/CustomerSupportIssueResolved'
import Handler from 'utils/messaging/Handler'
import MessageBus from 'utils/messaging/MessageBus'
import MakeCustomerSupportAgentStatusAvailable from './MakeCustomerSupportAgentStatusAvailable'

class CustomerSupportIssueResolvedHandler implements Handler<CustomerSupportIssueResolved> {
  constructor(private _commandBus: MessageBus) {

  }

  async handle(message: CustomerSupportIssueResolved): Promise<void> {
    await this._commandBus.publish(MakeCustomerSupportAgentStatusAvailable.forId(message.agentId))
  }
}
export default CustomerSupportIssueResolvedHandler
