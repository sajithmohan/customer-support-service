import CustomerSupportAgentId from '@domain/CustomerSupportAgent/CustomerSupportAgentId'
import CustomerSupportAgentJoined from '@domain/CustomerSupportAgent/CustomerSupportAgentJoined'
import Message from 'utils/messaging/Message'

class CustomerSupportAgentBecameAvailable extends Message {
  public static with(id: CustomerSupportAgentId): CustomerSupportAgentJoined {
    return new this({
      id: id.value,
    })
  }

  public get id(): CustomerSupportAgentId {
    return CustomerSupportAgentId.fromString(this.payload.id)
  }
}

export default CustomerSupportAgentBecameAvailable
