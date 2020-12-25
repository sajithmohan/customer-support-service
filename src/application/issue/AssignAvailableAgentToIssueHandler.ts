import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import Handler from 'utils/messaging/Handler'
import CustomerSupportIssueRepository from '@domain/CustomerSupportAgent/CustomerSupportIssueRepository'
import AssignAvailableAgentToIssue from '@application/issue/AssignAvailableAgentToIssue'
import MessageBus from 'utils/messaging/MessageBus'
import { isEmpty } from 'lodash'

class AssignAvailableAgentToIssueHandler implements Handler<AssignAvailableAgentToIssue> {
  constructor(
    private _agentRepo: CustomerSupportAgentRepository,
    private _issueRepo: CustomerSupportIssueRepository,
    private _bus: MessageBus,
  ) {

  }

  async handle(message: AssignAvailableAgentToIssue): Promise<void> {
    const agent = await this._agentRepo.findOneAvailableAgent()

    if (agent === null) {
      return
    }
    const activeIssuesForAgent = await this._issueRepo.findActiveByAssignee(agent.id)
    if (!isEmpty(activeIssuesForAgent)) {
      // implement retry for this case
      throw new Error('Already exists')
    }

    const issue = await this._issueRepo.get(message.id)
    issue.assignCustomerSupportAgent(agent.id)
    await this._agentRepo.save(agent)
    await this._issueRepo.save(issue)
    await issue.publishDomainEvents(this._bus)
  }
}

export default AssignAvailableAgentToIssueHandler
