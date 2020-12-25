import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import Handler from 'utils/messaging/Handler'
import CustomerSupportIssueRepository from '@domain/CustomerSupportAgent/CustomerSupportIssueRepository'
import MessageBus from 'utils/messaging/MessageBus'
import AssignAvailableIssueToAgent from '@application/issue/AssignAvailableIssueToAgent'
import { isEmpty } from 'lodash'

class AssignAvailableIssueToAgentHandler implements Handler<AssignAvailableIssueToAgent> {
  constructor(
    private _agentRepo: CustomerSupportAgentRepository,
    private _issueRepo: CustomerSupportIssueRepository,
    private _bus: MessageBus,
  ) {

  }

  async handle(message: AssignAvailableIssueToAgent): Promise<void> {
    const issue = await this._issueRepo.findOneAvailableIssue()

    if (issue === null) {
      // No active issues
      return
    }

    const activeIssuesForAgent = await this._issueRepo.findActiveByAssignee(message.id)
    if (!isEmpty(activeIssuesForAgent)) {
      // implement retry for this case
      throw new Error('Agent already assigned')
    }

    issue.assignCustomerSupportAgent(message.id)
    await this._issueRepo.save(issue)
    await issue.publishDomainEvents(this._bus)
  }
}

export default AssignAvailableIssueToAgentHandler
