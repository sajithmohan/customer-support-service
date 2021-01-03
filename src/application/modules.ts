import { ContainerModule, interfaces } from 'inversify'
import Handler from 'utils/messaging/Handler'
import Message from 'utils/messaging/Message'
import MessageBus from 'utils/messaging/MessageBus'
import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import OpenCustomerSupportIssueHandler from '@application/issue/OpenCustomerSupportIssueHandler'
import CustomerSupportIssueRepository from '@domain/CustomerSupportAgent/CustomerSupportIssueRepository'
import AssignAvailableIssueToAgentHandler from '@application/issue/AssignAvailableIssueToAgentHandler'
import CustomerSupportAgentJoinedHandler from '@application/agent/CustomerSupportAgentJoinedHandler'
import JoinCustomerSupportHandler from '@application/agent/JoinCustomerSupportHandler'
import CustomerSupportIssueReportedHandler from '@application/issue/CustomerSupportIssueOpenedHandler'
import MakeCustomerSupportAgentStatusAssignedHandler from '@application/agent/MakeCustomerSupportAgentStatusAssignedHandler'
import CustomerSupportIssueAssignedHandler from '@application/agent/CustomerSupportIssueAssignedHandler'
import CustomerSupportIssueResolvedHandler from '@application/agent/CustomerSupportIssueResolvedHandler'
import AssignAvailableAgentToIssueHandler from './issue/AssignAvailableAgentToIssueHandler'
import ResolveCustomerSupportIssueHandler from './issue/ResolveCustomerSupportIssueHandler'
import MakeCustomerSupportAgentStatusAvailableHandler from './agent/MakeCustomerSupportAgentStatusAvailableHandler'
import CustomerSupportAgentBecameAvailableHandler from './agent/CustomerSupportAgentBecameAvailableHandler'

const applicationContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<Handler<Message>>(JoinCustomerSupportHandler)
      .toDynamicValue((context) => {
        const repo = context.container
          .get<CustomerSupportAgentRepository>(CustomerSupportAgentRepository)
        const messageBus = context.container
          .get<MessageBus>('EventBus')
        return new JoinCustomerSupportHandler(repo, messageBus)
      })

    bind<Handler<Message>>(OpenCustomerSupportIssueHandler)
      .toDynamicValue((context) => {
        const repo = context.container
          .get<CustomerSupportIssueRepository>(CustomerSupportIssueRepository)
        const messageBus = context.container
          .get<MessageBus>('EventBus')
        return new OpenCustomerSupportIssueHandler(repo, messageBus)
      })

    bind<Handler<Message>>(CustomerSupportIssueReportedHandler)
      .toDynamicValue((context) => {
        const messageBus = context.container
          .get<MessageBus>('CommandBus')
        return new CustomerSupportIssueReportedHandler(messageBus)
      })
    bind<Handler<Message>>(CustomerSupportAgentJoinedHandler)
      .toDynamicValue((context) => {
        const messageBus = context.container
          .get<MessageBus>('CommandBus')
        return new CustomerSupportAgentJoinedHandler(messageBus)
      })

    bind<Handler<Message>>(CustomerSupportIssueResolvedHandler)
      .toDynamicValue((context) => {
        const messageBus = context.container
          .get<MessageBus>('CommandBus')
        return new CustomerSupportIssueResolvedHandler(messageBus)
      })

    bind<Handler<Message>>(CustomerSupportIssueAssignedHandler)
      .toDynamicValue((context) => {
        const messageBus = context.container
          .get<MessageBus>('CommandBus')
        return new CustomerSupportIssueAssignedHandler(messageBus)
      })

    bind<Handler<Message>>(CustomerSupportAgentBecameAvailableHandler)
      .toDynamicValue((context) => {
        const messageBus = context.container
          .get<MessageBus>('CommandBus')
        return new CustomerSupportAgentBecameAvailableHandler(messageBus)
      })

    bind<Handler<Message>>(AssignAvailableAgentToIssueHandler)
      .toDynamicValue((context) => {
        const issueRepo = context.container
          .get<CustomerSupportIssueRepository>(CustomerSupportIssueRepository)
        const agentRepo = context.container
          .get<CustomerSupportAgentRepository>(CustomerSupportAgentRepository)
        const messageBus = context.container
          .get<MessageBus>('EventBus')
        return new AssignAvailableAgentToIssueHandler(agentRepo, issueRepo, messageBus)
      })

    bind<Handler<Message>>(AssignAvailableIssueToAgentHandler)
      .toDynamicValue((context) => {
        const issueRepo = context.container
          .get<CustomerSupportIssueRepository>(CustomerSupportIssueRepository)
        const agentRepo = context.container
          .get<CustomerSupportAgentRepository>(CustomerSupportAgentRepository)
        const messageBus = context.container
          .get<MessageBus>('EventBus')
        return new AssignAvailableIssueToAgentHandler(agentRepo, issueRepo, messageBus)
      })

    bind<Handler<Message>>(MakeCustomerSupportAgentStatusAssignedHandler)
      .toDynamicValue((context) => {
        const agentRepo = context.container
          .get<CustomerSupportAgentRepository>(CustomerSupportAgentRepository)
        const messageBus = context.container
          .get<MessageBus>('EventBus')
        return new MakeCustomerSupportAgentStatusAssignedHandler(messageBus, agentRepo)
      })

    bind<Handler<Message>>(ResolveCustomerSupportIssueHandler)
      .toDynamicValue((context) => {
        const repo = context.container
          .get<CustomerSupportIssueRepository>(CustomerSupportIssueRepository)
        const messageBus = context.container
          .get<MessageBus>('EventBus')
        return new ResolveCustomerSupportIssueHandler(repo, messageBus)
      })

    bind<Handler<Message>>(MakeCustomerSupportAgentStatusAvailableHandler)
      .toDynamicValue((context) => {
        const agentRepo = context.container
          .get<CustomerSupportAgentRepository>(CustomerSupportAgentRepository)
        const messageBus = context.container
          .get<MessageBus>('EventBus')
        return new MakeCustomerSupportAgentStatusAvailableHandler(messageBus, agentRepo)
      })

    bind('CommandRouter').toDynamicValue(async (context: interfaces.Context) => {
      const bus: MessageBus = context.container.get<MessageBus>('CommandBus')
      const joinCustomerSupportHandler = context.container
        .get<Handler<Message>>(JoinCustomerSupportHandler)
      const openCustomerSupportIssueHandler = context.container
        .get<Handler<Message>>(OpenCustomerSupportIssueHandler)
      const assignAvailableAgentToIssueHandler = context.container
        .get<Handler<Message>>(AssignAvailableAgentToIssueHandler)
      const assignAvailableIssueToAgentHandler = context.container
        .get<Handler<Message>>(AssignAvailableIssueToAgentHandler)
      const makeCustomerSupportAgentStatusAssignedHandler = context.container
        .get<Handler<Message>>(MakeCustomerSupportAgentStatusAssignedHandler)
      const resolveCustomerSupportIssueHandler = context.container
        .get<Handler<Message>>(ResolveCustomerSupportIssueHandler)
      const makeCustomerSupportAgentStatusAvailableHandler = context.container
        .get<Handler<Message>>(MakeCustomerSupportAgentStatusAvailableHandler)

      await bus.subscribe('JoinCustomerSupport', joinCustomerSupportHandler)
      await bus.subscribe('OpenCustomerSupportIssue', openCustomerSupportIssueHandler)
      await bus.subscribe('AssignAvailableAgentToIssue', assignAvailableAgentToIssueHandler)
      await bus.subscribe('AssignAvailableIssueToAgent', assignAvailableIssueToAgentHandler)
      await bus.subscribe('MakeCustomerSupportAgentStatusAssigned', makeCustomerSupportAgentStatusAssignedHandler)
      await bus.subscribe('ResolveCustomerSupportIssue', resolveCustomerSupportIssueHandler)
      await bus.subscribe('MakeCustomerSupportAgentStatusAvailable', makeCustomerSupportAgentStatusAvailableHandler)
    }).inSingletonScope()

    bind('EventRouter').toDynamicValue(async (context: interfaces.Context) => {
      const bus: MessageBus = context.container.get<MessageBus>('EventBus')

      const customerSupportIssueOpenedHandler = context.container
        .get<Handler<Message>>(CustomerSupportIssueReportedHandler)

      const customerSupportAgentJoinedHandler = context.container
        .get<Handler<Message>>(CustomerSupportAgentJoinedHandler)

      const customerSupportIssueResolvedHandler = context.container
        .get<Handler<Message>>(CustomerSupportIssueResolvedHandler)

      const customerSupportIssueAssignedHandler = context.container
        .get<Handler<Message>>(CustomerSupportIssueAssignedHandler)

      const customerSupportAgentBecameAvailableHandler = context.container
        .get<Handler<Message>>(CustomerSupportAgentBecameAvailableHandler)

      await bus.subscribe('CustomerSupportIssueReported', customerSupportIssueOpenedHandler)
      await bus.subscribe('CustomerSupportAgentJoined', customerSupportAgentJoinedHandler)
      await bus.subscribe('CustomerSupportIssueAssigned', customerSupportIssueAssignedHandler)
      await bus.subscribe('CustomerSupportIssueResolved', customerSupportIssueResolvedHandler)
      await bus.subscribe('CustomerSupportAgentBecameAvailable', customerSupportAgentBecameAvailableHandler)
    }).inSingletonScope()
  },
)

export default applicationContainerModule
