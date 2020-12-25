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
import CustomerSupportIssueOpenedHandler from '@application/issue/CustomerSupportIssueOpenedHandler'
import MakeCustomerSupportAgentStatusAssignedHandler from '@application/agent/MakeCustomerSupportAgentStatusAssignedHandler'
import CustomerSupportIssueAssignedHandler from '@application/agent/CustomerSupportIssueAssignedHandler'
import AssignAvailableAgentToIssueHandler from './issue/AssignAvailableAgentToIssueHandler'

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

    bind<Handler<Message>>(CustomerSupportIssueOpenedHandler)
      .toDynamicValue((context) => {
        const messageBus = context.container
          .get<MessageBus>('CommandBus')
        return new CustomerSupportIssueOpenedHandler(messageBus)
      })
    bind<Handler<Message>>(CustomerSupportAgentJoinedHandler)
      .toDynamicValue((context) => {
        const messageBus = context.container
          .get<MessageBus>('CommandBus')
        return new CustomerSupportAgentJoinedHandler(messageBus)
      })

    bind<Handler<Message>>(CustomerSupportIssueAssignedHandler)
      .toDynamicValue((context) => {
        const messageBus = context.container
          .get<MessageBus>('CommandBus')
        return new CustomerSupportIssueAssignedHandler(messageBus)
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

        return new MakeCustomerSupportAgentStatusAssignedHandler(agentRepo)
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

      await bus.subscribe('JoinCustomerSupport', joinCustomerSupportHandler)
      await bus.subscribe('OpenCustomerSupportIssue', openCustomerSupportIssueHandler)
      await bus.subscribe('AssignAvailableAgentToIssue', assignAvailableAgentToIssueHandler)
      await bus.subscribe('AssignAvailableIssueToAgent', assignAvailableIssueToAgentHandler)
      await bus.subscribe('MakeCustomerSupportAgentStatusAssigned', makeCustomerSupportAgentStatusAssignedHandler)
    }).inSingletonScope()

    bind('EventRouter').toDynamicValue(async (context: interfaces.Context) => {
      const bus: MessageBus = context.container.get<MessageBus>('EventBus')

      const customerSupportIssueOpenedHandler = context.container
        .get<Handler<Message>>(CustomerSupportIssueOpenedHandler)

      const customerSupportAgentJoinedHandler = context.container
        .get<Handler<Message>>(CustomerSupportAgentJoinedHandler)

      const customerSupportIssueAssignedHandler = context.container
        .get<Handler<Message>>(CustomerSupportIssueAssignedHandler)
      await bus.subscribe('CustomerSupportIssueOpened', customerSupportIssueOpenedHandler)
      await bus.subscribe('CustomerSupportAgentJoined', customerSupportAgentJoinedHandler)
      await bus.subscribe('CustomerSupportIssueAssigned', customerSupportIssueAssignedHandler)
    }).inSingletonScope()
  },
)

export default applicationContainerModule
