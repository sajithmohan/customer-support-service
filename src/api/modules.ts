import CustomerSupportJoiner from '@api/CustomerSupportJoiner'
import CustomerSupportIssueReporter from '@api/CustomerSupportIssueReporter'
import { ContainerModule } from 'inversify'
import { TYPE, interfaces } from 'inversify-restify-utils'
import MessageBus from 'utils/messaging/MessageBus'
import CustomerSupportIssueResolver from '@api/CustomerSupportIssueResolver'

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
        return new CustomerSupportIssueReporter(bus)
      }).whenTargetNamed(CustomerSupportIssueReporter.name)

    bind<interfaces.Controller>(TYPE.Controller)
      .toDynamicValue((context) => {
        const bus = context.container.get<MessageBus>('CommandBus')
        return new CustomerSupportIssueResolver(bus)
      }).whenTargetNamed(CustomerSupportIssueResolver.name)
  },
)
export default apiContainerModule
