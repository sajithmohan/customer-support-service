import Message from 'utils/messaging/Message'
import Handler from 'utils/messaging/Handler'
import CustomerSupportIssueAssigned from '@domain/Issue/CustomerSupportIssueAssigned'
import MessageBus from 'utils/messaging/MessageBus'
import MakeCustomerSupportAgentStatusAssigned from './MakeCustomerSupportAgentStatusAssigned'

class CustomerSupportIssueAssignedHandler implements Handler<CustomerSupportIssueAssigned> {
  constructor(private _commandBus: MessageBus) {

  }

  async handle(message: CustomerSupportIssueAssigned): Promise<void> {
    await this._commandBus.publish(MakeCustomerSupportAgentStatusAssigned.forId(message.agentId))
  }
}
export default CustomerSupportIssueAssignedHandler
