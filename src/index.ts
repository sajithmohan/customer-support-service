import { InversifyRestifyServer } from 'inversify-restify-utils'
import * as restify from 'restify'
import AppContainer from './AppContainer'

AppContainer.get('CommandRouter')
const server = new InversifyRestifyServer(AppContainer)

const application: restify.Server = server.build()

application.listen(5000)
