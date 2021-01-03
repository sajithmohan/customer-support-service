import Handler from 'utils/messaging/Handler'
import pino, { Logger } from 'pino'
import MessageBus from 'utils/messaging/MessageBus'
import OpenCustomerSupportIssue from '@application/issue/OpenCustomerSupportIssue'
import CustomerSupportIssue from '@domain/Issue/CustomerSupportIssue'
import CustomerSupportIssueRepository from '../../domain/CustomerSupportAgent/CustomerSupportIssueRepository'

class OpenCustomerSupportIssueHandler implements Handler<OpenCustomerSupportIssue> {
  private _logger: Logger

  constructor(private _repo: CustomerSupportIssueRepository, private _bus: MessageBus) {
    this._logger = pino()
  }

  async handle(message: OpenCustomerSupportIssue): Promise<void> {
    try {
      this._logger.debug('OpenCustomerSupportIssue command triggered')
      const issue = CustomerSupportIssue.report(
        message.id,
        message.customerId,
        message.title,
        message.description,
      )
      await this._repo.save(issue)
      await issue.publishDomainEvents(this._bus)
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }
}

export default OpenCustomerSupportIssueHandler
