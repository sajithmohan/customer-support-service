import 'reflect-metadata'
import { Container } from 'inversify'
import apiContainerModule from '@api/modules'
import infraContainerModule from '@infrastructure/modules'
import applicationContainerModule from '@application/modules'

const AppContainer = new Container()

AppContainer.load(apiContainerModule)
AppContainer.load(infraContainerModule)
AppContainer.load(applicationContainerModule)
export default AppContainer
