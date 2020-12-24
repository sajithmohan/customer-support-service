import CustomerSupportJoiner from '@api/CustomerSupportJoiner'
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
  },
)
export default apiContainerModule
