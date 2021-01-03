/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller, interfaces, Post,
} from 'inversify-restify-utils'
import { injectable } from 'inversify'
import { Request, Response, plugins } from 'restify'
import MessageBus from 'utils/messaging/MessageBus'
import * as errors from 'restify-errors'
import CustomerId from '@domain/CustomerId'
import CustomerSupportIssueTitle from '@domain/Issue/CustomerSupportIssueTitle'
import OpenCustomerSupportIssue from '@application/issue/OpenCustomerSupportIssue'
import CustomerSupportIssueId from '@domain/Issue/CustomerSupportIssueId'
import CustomerSupportAgentAlreadyExists from '../application/agent/CustomerSupportAgentAlreadyExists'
import CustomerSupportIssueDescription from '../domain/Issue/CustomerSupportIssueDescription'

@Controller('/customer-support-issues')
@injectable()

class CustomerSupportIssueReporter implements interfaces.Controller {
  constructor(private _commandBus: MessageBus) {

  }

  @Post('/', ...plugins.jsonBodyParser())
  async index(req: Request, res: Response): Promise<void> {
    let customerId: CustomerId
    let title: CustomerSupportIssueTitle
    let description: CustomerSupportIssueDescription
    const id = CustomerSupportIssueId.generate()
    try {
      customerId = CustomerId.fromString(<string> req.body.customer_id)
      title = CustomerSupportIssueTitle.fromString(<string> req.body.title)

      description = CustomerSupportIssueDescription.fromString(<string> req.body.description)
    } catch (error) {
      res.send(new errors.BadRequestError(error))
      return
    }
    try {
      await this._commandBus.publish(
        OpenCustomerSupportIssue.createFrom(id, customerId, title, description),
      )
      res.json({ id: id.value })
    } catch (error) {
      if (error instanceof CustomerSupportAgentAlreadyExists) {
        res.send(new errors.ConflictError(error.message))
      }
      res.send(new errors.InternalError(error))
    }
  }
}

export default CustomerSupportIssueReporter
