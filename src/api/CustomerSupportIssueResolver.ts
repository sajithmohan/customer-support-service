/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller, interfaces, Put,
} from 'inversify-restify-utils'
import { injectable } from 'inversify'
import { Request, Response, plugins } from 'restify'
import MessageBus from 'utils/messaging/MessageBus'
import * as errors from 'restify-errors'
import CustomerSupportIssueId from '@domain/Issue/CustomerSupportIssueId'
import CustomerSupportIssueNotFound from '@domain/Issue/CustomerSupportIssueNotFound'
import ResolveCustomerSupportIssue from '../application/issue/ResolveCustomerSupportIssue'

@Controller('/customer-support-issues')
@injectable()

class CustomerSupportIssueResolver implements interfaces.Controller {
  constructor(private _commandBus: MessageBus) {

  }

  @Put('/:id/status', ...plugins.jsonBodyParser())
  async index(req: Request, res: Response): Promise<void> {
    let id: CustomerSupportIssueId
    const allowedStatus = ['RESOLVED']
    try {
      if (!allowedStatus.includes(req.body.status)) {
        throw TypeError(`status must be one of ${allowedStatus.join(', ')}`)
      }
      id = CustomerSupportIssueId.fromString(<string> req.params.id)
    } catch (error) {
      res.send(new errors.BadRequestError(error))
      return
    }
    try {
      await this._commandBus.publish(
        ResolveCustomerSupportIssue.createFrom(id),
      )
      res.json({})
    } catch (error) {
      if (error instanceof CustomerSupportIssueNotFound) {
        res.send(new errors.NotFoundError(error.message))
      }
      res.send(new errors.InternalError(error))
    }
  }
}

export default CustomerSupportIssueResolver
