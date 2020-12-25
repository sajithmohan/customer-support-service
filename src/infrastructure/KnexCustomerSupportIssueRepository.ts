import CustomerId from '@domain/CustomerId'
import CustomerSupportIssueRepository from '@domain/CustomerSupportAgent/CustomerSupportIssueRepository'
import CustomerSupportIssue from '@domain/Issue/CustomerSupportIssue'
import CustomerSupportIssueNotFound from '@domain/Issue/CustomerSupportIssueNotFound'
import Knex from 'knex'
import { isEmpty, isNil, omit } from 'lodash'
import CustomerSupportIssueTitle from '@domain/Issue/CustomerSupportIssueTitle'
import CustomerSupportIssueState from '@domain/Issue/CustomerSupportIssueState'
import CustomerSupportAgentId from '@domain/CustomerSupportAgent/CustomerSupportAgentId'
import CustomerSupportIssueId from '../domain/Issue/CustomerSupportIssueId'
import CustomerSupportIssueDescription from '../domain/Issue/CustomerSupportIssueDescription'

type IssueData = {
  id: string
  opened_customer_id: string,
  title: string
  description: string
  state: string,
  assigned_agent_id: string | null
}
class KnexCustomerSupportIssueRepository implements CustomerSupportIssueRepository {
  constructor(private _knex: Knex<IssueData, IssueData[]>, private _tableName: string) {

  }

  async findActiveByAssignee(id: CustomerSupportAgentId): Promise<CustomerSupportIssue[]> {
    const issues = await this._knex.table(this._tableName).select().where('assigned_agent_id', id.value).where('state', CustomerSupportIssueState.ASSIGNED)
    return issues.map((issue) => CustomerSupportIssue.fromData(
      CustomerSupportIssueId.fromString(issue.id),
      CustomerId.fromString(issue.opened_customer_id),
      CustomerSupportIssueTitle.fromString(issue.title),
      CustomerSupportIssueDescription.fromString(issue.description),
      CustomerSupportIssueState.fromString(issue.state),
      isNil(issue.assigned_agent_id)
        ? null : CustomerSupportAgentId.fromString(issue.assigned_agent_id),
    ))
  }

  async get(id: CustomerSupportIssueId): Promise<CustomerSupportIssue> {
    const issue = await this.findOne(id)
    if (issue === null) {
      throw CustomerSupportIssueNotFound.forId(id)
    }
    return issue
  }

  async findOne(id: CustomerSupportIssueId): Promise<CustomerSupportIssue | null> {
    const issue = await this._knex.table(this._tableName).select().where('id', id.value).limit(1)
    if (isEmpty(issue)) {
      return null
    }
    return CustomerSupportIssue.fromData(
      id,
      CustomerId.fromString(issue[0].opened_customer_id),
      CustomerSupportIssueTitle.fromString(issue[0].title),
      CustomerSupportIssueDescription.fromString(issue[0].description),
      CustomerSupportIssueState.fromString(issue[0].state),
      isNil(issue[0].assigned_agent_id)
        ? null : CustomerSupportAgentId.fromString(issue[0].assigned_agent_id),
    )
  }

  async findOneAvailableIssue(): Promise<CustomerSupportIssue | null> {
    const issue = await this._knex.table(this._tableName).select().where('state', CustomerSupportIssueState.OPENED).limit(1)
    if (isEmpty(issue)) {
      return null
    }
    return CustomerSupportIssue.fromData(
      CustomerSupportIssueId.fromString(issue[0].id),
      CustomerId.fromString(issue[0].opened_customer_id),
      CustomerSupportIssueTitle.fromString(issue[0].title),
      CustomerSupportIssueDescription.fromString(issue[0].description),
      CustomerSupportIssueState.fromString(issue[0].state),
      isNil(issue[0].assigned_agent_id)
        ? null : CustomerSupportAgentId.fromString(issue[0].assigned_agent_id),
    )
  }

  async save(issue: CustomerSupportIssue): Promise<void> {
    const data: IssueData = {
      id: issue.id.value,
      title: issue.title.value,
      description: issue.description.value,
      opened_customer_id: issue.customerId.value,
      state: issue.state.value,
      assigned_agent_id: isNil(issue.assignedAgentId) ? null : issue.assignedAgentId.value,
    }
    const insertQuery = this._knex.table(this._tableName).insert(data)
    const updateQuery = this._knex.update(omit(data, 'id'))
    const rawQuery = this._knex
      .raw('? ON CONFLICT (id) DO ?', [insertQuery, updateQuery])
    await rawQuery
  }
}

export default KnexCustomerSupportIssueRepository
