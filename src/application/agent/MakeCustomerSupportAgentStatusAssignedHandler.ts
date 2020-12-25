import Handler from 'utils/messaging/Handler'
import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import pino, { Logger } from 'pino'
import MakeCustomerSupportAgentStatusAssigned from './MakeCustomerSupportAgentStatusAssigned'

// eslint-disable-next-line max-len
class MakeCustomerSupportAgentStatusAssignedHandler implements Handler<MakeCustomerSupportAgentStatusAssigned> {
  private _logger: Logger

  constructor(private _repo: CustomerSupportAgentRepository) {
    this._logger = pino()
  }

  async handle(message: MakeCustomerSupportAgentStatusAssigned): Promise<void> {
    try {
      const agent = await this._repo.get(message.id)
      agent.assign()
      await this._repo.save(agent)
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }
}
export default MakeCustomerSupportAgentStatusAssignedHandler
