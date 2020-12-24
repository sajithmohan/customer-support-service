import CustomerSupportAgent from '@domain/CustomerSupportAgent/CustomerSupportAgent'
import CustomerSupportAgentId from '@domain/CustomerSupportAgent/CustomerSupportAgentId'
import CustomerSupportAgentRepository from '@domain/CustomerSupportAgent/CustomerSupportAgentRepository'
import Knex from 'knex'
import { isEmpty } from 'lodash'
import CustomerSupportAgentAvailability from '../domain/CustomerSupportAgent/CustomerSupportAgentAvailability'

type AgentData = {
  id: string,
  availability: string
}
class KnexCustomerSupportAgentRepository implements CustomerSupportAgentRepository {
  constructor(private _knex: Knex<AgentData, AgentData[]>, private _tableName: string) {

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

  async save(agent: CustomerSupportAgent): Promise<void> {
    await this._knex.table(this._tableName).insert({
      id: agent.id.value,
      availability: agent.availability.value,
    })
  }
}

export default KnexCustomerSupportAgentRepository
