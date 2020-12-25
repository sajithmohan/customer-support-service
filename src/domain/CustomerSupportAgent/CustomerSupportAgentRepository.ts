import CustomerSupportAgent from './CustomerSupportAgent'
import CustomerSupportAgentId from './CustomerSupportAgentId'

abstract class CustomerSupportAgentRepository {
  abstract save(agent: CustomerSupportAgent): Promise<void>

  abstract get(id: CustomerSupportAgentId): Promise<CustomerSupportAgent>

  abstract findOne(agentId: CustomerSupportAgentId): Promise<CustomerSupportAgent | null>

  abstract findOneAvailableAgent(): Promise<CustomerSupportAgent | null>
}

export default CustomerSupportAgentRepository
