import 'reflect-metadata'
import { Container } from 'inversify'
import apiContainerModule from '@api/modules'

const AppContainer = new Container()

AppContainer.load(apiContainerModule)

export default AppContainer
