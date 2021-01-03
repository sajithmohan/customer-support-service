import Message from 'utils/messaging/Message'
import CustomerSupportAgentId from '../../domain/CustomerSupportAgent/CustomerSupportAgentId'

class MakeCustomerSupportAgentStatusAvailable extends Message {
  public static forId(id: CustomerSupportAgentId): MakeCustomerSupportAgentStatusAvailable {
    return new this({
      id: id.value,
    })
  }

  get id(): CustomerSupportAgentId {
    return CustomerSupportAgentId.fromString(this.payload.id)
  }
}

export default MakeCustomerSupportAgentStatusAvailable
