import Handler from 'utils/messaging/Handler'
import pino, { Logger } from 'pino'
import MessageBus from 'utils/messaging/MessageBus'
import ResolveCustomerSupportIssue from '@application/issue/ResolveCustomerSupportIssue'
import CustomerSupportIssueRepository from '../../domain/CustomerSupportAgent/CustomerSupportIssueRepository'

class ResolveCustomerSupportIssueHandler implements Handler<ResolveCustomerSupportIssue> {
  private _logger: Logger

  constructor(private _repo: CustomerSupportIssueRepository, private _bus: MessageBus) {
    this._logger = pino()
  }

  async handle(message: ResolveCustomerSupportIssue): Promise<void> {
    try {
      this._logger.debug('ResolveCustomerSupportIssue command triggered')
      const issue = await this._repo.get(message.id)
      issue.resolve()
      await this._repo.save(issue)
      await issue.publishDomainEvents(this._bus)
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }
}

export default ResolveCustomerSupportIssueHandler
