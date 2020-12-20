import { Controller, Get, interfaces } from 'inversify-restify-utils'
import { injectable } from 'inversify'

@Controller('/')
@injectable()

 class HelloController implements interfaces.Controller {
  @Get('/')
  index(): string {
    return 'hello world'
  }
}

export { HelloController }
