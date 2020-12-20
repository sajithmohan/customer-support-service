import { InversifyRestifyServer } from 'inversify-restify-utils';
import * as restify from 'restify';
import AppContainer from './AppContainer'

const server = new InversifyRestifyServer(AppContainer);

const application: restify.Server = server.build();

application.listen(3000);
