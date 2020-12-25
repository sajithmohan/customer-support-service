import Message from 'utils/messaging/Message'
import CustomerSupportAgentId from '../../domain/CustomerSupportAgent/CustomerSupportAgentId'

class MakeCustomerSupportAgentStatusAssigned extends Message {
  public static forId(id: CustomerSupportAgentId): MakeCustomerSupportAgentStatusAssigned {
    return new this({
      id: id.value,
    })
  }

  get id(): CustomerSupportAgentId {
    return CustomerSupportAgentId.fromString(this.payload.id)
  }
}

export default MakeCustomerSupportAgentStatusAssigned
