import CustomerSupportAgent from '@domain/CustomerSupportAgent/CustomerSupportAgent'
import CustomerSupportAgentId from '@domain/CustomerSupportAgent/CustomerSupportAgentId'
import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import Knex from 'knex'
import { isEmpty, omit } from 'lodash'
import CustomerSupportAgentAvailability from '../domain/CustomerSupportAgent/CustomerSupportAgentAvailability'
import CustomerSupportAgentNotFound from '../domain/CustomerSupportAgent/CustomerSupportAgentNotFound'

type AgentData = {
  id: string,
  availability: string
}
class KnexCustomerSupportAgentRepository implements CustomerSupportAgentRepository {
  constructor(private _knex: Knex<AgentData, AgentData[]>, private _tableName: string) {

  }

  async get(id: CustomerSupportAgentId): Promise<CustomerSupportAgent> {
    const agent = await this.findOne(id)
    if (agent === null) {
      throw CustomerSupportAgentNotFound.forId(id)
    }
    return agent
  }

  async findOne(agentId: CustomerSupportAgentId): Promise<CustomerSupportAgent | null> {
    const agent = await this._knex.table(this._tableName).select().where('id', agentId.value).limit(1)
    if (isEmpty(agent)) {
      return null
    }
    const id = CustomerSupportAgentId.fromString(agent[0].id)
    const availability = CustomerSupportAgentAvailability.fromString(agent[0].availability)
    return CustomerSupportAgent.fromData(id, availability)
  }

  async findOneAvailableAgent(): Promise<CustomerSupportAgent | null> {
    const agent = await this._knex.table(this._tableName).select().where('availability', CustomerSupportAgentAvailability.AVAILABLE).limit(1)
    if (isEmpty(agent)) {
      return null
    }
    const id = CustomerSupportAgentId.fromString(agent[0].id)
    const availability = CustomerSupportAgentAvailability.fromString(agent[0].availability)
    return CustomerSupportAgent.fromData(id, availability)
  }

  async save(agent: CustomerSupportAgent): Promise<void> {
    const data: AgentData = {
      id: agent.id.value,
      availability: agent.availability.value,
    }
    const insertQuery = this._knex.table(this._tableName).insert(data)
    const updateQuery = this._knex.update(omit(data, 'id'))
    const rawQuery = this._knex
      .raw('? ON CONFLICT (id) DO ?', [insertQuery, updateQuery])
    await rawQuery
  }
}

export default KnexCustomerSupportAgentRepository
