import CustomerSupportJoiner from '@api/CustomerSupportJoiner'
import CustomerSupportIssueOpener from '@api/CustomerSupportIssueOpener'
import { ContainerModule } from 'inversify'
import { TYPE, interfaces } from 'inversify-restify-utils'
import MessageBus from 'utils/messaging/MessageBus'

const apiContainerModule = new ContainerModule(
  (bind) => {
    bind<interfaces.Controller>(TYPE.Controller)
      .toDynamicValue((context) => {
        const bus = context.container.get<MessageBus>('CommandBus')
        return new CustomerSupportJoiner(bus)
      }).whenTargetNamed(CustomerSupportJoiner.name)

    bind<interfaces.Controller>(TYPE.Controller)
      .toDynamicValue((context) => {
        const bus = context.container.get<MessageBus>('CommandBus')
        return new CustomerSupportIssueOpener(bus)
      }).whenTargetNamed(CustomerSupportIssueOpener.name)
  },
)
export default apiContainerModule
