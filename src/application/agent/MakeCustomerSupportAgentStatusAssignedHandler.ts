import Handler from 'utils/messaging/Handler'
import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import pino, { Logger } from 'pino'
import MessageBus from 'utils/messaging/MessageBus'
import MakeCustomerSupportAgentStatusAssigned from './MakeCustomerSupportAgentStatusAssigned'

// eslint-disable-next-line max-len
class MakeCustomerSupportAgentStatusAssignedHandler implements Handler<MakeCustomerSupportAgentStatusAssigned> {
  private _logger: Logger

  constructor(private _bus: MessageBus, private _repo: CustomerSupportAgentRepository) {
    this._logger = pino()
  }

  async handle(message: MakeCustomerSupportAgentStatusAssigned): Promise<void> {
    try {
      const agent = await this._repo.get(message.id)
      agent.makeAssigned()
      await this._repo.save(agent)
      await agent.publishDomainEvents(this._bus)
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }
}
export default MakeCustomerSupportAgentStatusAssignedHandler
