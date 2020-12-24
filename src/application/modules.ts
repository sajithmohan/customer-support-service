import { ContainerModule, interfaces } from 'inversify'
import Handler from 'utils/messaging/Handler'
import Message from 'utils/messaging/Message'
import MessageBus from 'utils/messaging/MessageBus'
import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import JoinCustomerSupportHandler from './JoinCustomerSupportHandler'

const applicationContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<Handler<Message>>(JoinCustomerSupportHandler)
      .toDynamicValue((context) => {
        const repo = context.container
          .get<CustomerSupportAgentRepository>(CustomerSupportAgentRepository)
        const messageBus = context.container
          .get<MessageBus>('EventBus')
        return new JoinCustomerSupportHandler(repo, messageBus)
      })

    bind('CommandRouter').toDynamicValue(async (context: interfaces.Context) => {
      const bus: MessageBus = context.container.get<MessageBus>('CommandBus')
      const handler = context.container.get<Handler<Message>>(JoinCustomerSupportHandler)

      await bus.subscribe('JoinCustomerSupport', handler)
    }).inSingletonScope()
  },
)

export default applicationContainerModule
