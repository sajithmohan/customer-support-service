import { HelloController } from '@api/HelloController'
import { ContainerModule } from 'inversify'
import { TYPE, interfaces } from 'inversify-restify-utils'

const apiContainerModule = new ContainerModule(
  (bind) => {
    bind<interfaces.Controller>(TYPE.Controller)
      .to(HelloController).whenTargetNamed(HelloController.name)
  },
)
export default apiContainerModule
