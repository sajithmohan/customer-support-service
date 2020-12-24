import {
  Controller, interfaces, Post,
} from 'inversify-restify-utils'
import { injectable } from 'inversify'
import { Request, Response, plugins } from 'restify'
import JoinCustomerSupport from '@application/JoinCustomerSupport'
import MessageBus from 'utils/messaging/MessageBus'
import * as errors from 'restify-errors'
import CustomerSupportAgentId from '../domain/CustomerSupportAgent/CustomerSupportAgentId'
import CustomerSupportAgentAlreadyExists from '../application/CustomerSupportAgentAlreadyExists'

@Controller('/customer-support-agents')
@injectable()

class CustomerSupportJoiner implements interfaces.Controller {
  constructor(private _commandBus: MessageBus) {

  }

  // Join customer support
  @Post('/', ...plugins.jsonBodyParser())
  async index(req: Request, res: Response): Promise<void> {
    let id: CustomerSupportAgentId
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      id = CustomerSupportAgentId.fromString(<string> req.body.id)
    } catch (error) {
      res.send(new errors.BadRequestError(error))
      return
    }
    try {
      await this._commandBus.publish(JoinCustomerSupport.createFrom(id))
      res.json({})
    } catch (error) {
      if (error instanceof CustomerSupportAgentAlreadyExists) {
        res.send(new errors.NotFoundError(error.message))
      }
      res.send(new errors.InternalError(error))
    }
  }
}

export default CustomerSupportJoiner
