import Handler from 'utils/messaging/Handler'
import pino, { Logger } from 'pino'
import MessageBus from 'utils/messaging/MessageBus'

import JoinCustomerSupport from '@application/agent/JoinCustomerSupport'
import CustomerSupportAgent from '@domain/CustomerSupportAgent/CustomerSupportAgent'
import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import CustomerSupportAgentAlreadyExists from './CustomerSupportAgentAlreadyExists'

class JoinCustomerSupportHandler implements Handler<JoinCustomerSupport> {
  private _logger: Logger

  constructor(private _repo: CustomerSupportAgentRepository, private _bus: MessageBus) {
    this._logger = pino()
  }

  async handle(message: JoinCustomerSupport): Promise<void> {
    try {
      const existingAgent = await this._repo.findOne(message.customerSupportAgentId)
      if (existingAgent != null) {
        throw CustomerSupportAgentAlreadyExists.forId(message.customerSupportAgentId)
      }
      const agent = CustomerSupportAgent.join(message.customerSupportAgentId)
      await this._repo.save(agent)
      await agent.publishDomainEvents(this._bus)
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }
}

export default JoinCustomerSupportHandler
