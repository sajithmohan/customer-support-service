import CustomerSupportAgent from './CustomerSupportAgent'
import CustomerSupportAgentId from './CustomerSupportAgentId'

abstract class CustomerSupportAgentRepository {
  abstract save(agent: CustomerSupportAgent): Promise<void>

  abstract findOne(agentId: CustomerSupportAgentId): Promise<CustomerSupportAgent | null>
}

export default CustomerSupportAgentRepository
