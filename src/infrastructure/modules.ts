import { ContainerModule, interfaces } from 'inversify'
import MessageBus from 'utils/messaging/MessageBus'
import EventEmitterMessageBus from 'utils/messaging/EventEmitterMessageBus'
import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import knex from 'knex'
import CustomerSupportIssueRepository from '@domain/CustomerSupportAgent/CustomerSupportIssueRepository'
import KnexCustomerSupportAgentRepository from './KnexCustomerSupportAgentRepository'
import config from '../../config'
import KnexCustomerSupportIssueRepository from './KnexCustomerSupportIssueRepository'

const infraContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<MessageBus>('EventBus').toDynamicValue(() => new EventEmitterMessageBus()).inSingletonScope()
    bind<MessageBus>('CommandBus').toDynamicValue(() => new EventEmitterMessageBus()).inSingletonScope()
    bind<knex>(knex).toDynamicValue(() => knex({
      client: 'pg',
      connection: {
        host: config.postgres.host,
        user: config.postgres.user,
        password: config.postgres.password,
        database: config.postgres.database,
      },
    })).inSingletonScope()

    bind<CustomerSupportAgentRepository>(CustomerSupportAgentRepository)
      .toDynamicValue((context) => {
        const db = context.container.get<knex>(knex)
        return new KnexCustomerSupportAgentRepository(
          db, config.postgres.tables.customer_support_agents,
        )
      }).inSingletonScope()

    bind<CustomerSupportIssueRepository>(CustomerSupportIssueRepository)
      .toDynamicValue((context) => {
        const db = context.container.get<knex>(knex)
        return new KnexCustomerSupportIssueRepository(
          db, config.postgres.tables.customer_support_issues,
        )
      }).inSingletonScope()
  },
)
export default infraContainerModule
