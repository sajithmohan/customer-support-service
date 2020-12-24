import Message from 'utils/messaging/Message'
import CustomerSupportAgentId from '../domain/CustomerSupportAgent/CustomerSupportAgentId'

class JoinCustomerSupport extends Message {
  public static createFrom(id: CustomerSupportAgentId): JoinCustomerSupport {
    return new this({
      customer_support_agent_id: id.value,
    })
  }

  get customerSupportAgentId(): CustomerSupportAgentId {
    return CustomerSupportAgentId.fromString(this.payload.customer_support_agent_id)
  }
}

export default JoinCustomerSupport
