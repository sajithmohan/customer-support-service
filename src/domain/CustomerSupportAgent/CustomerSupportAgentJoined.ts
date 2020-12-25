import Message from 'utils/messaging/Message'
import CustomerSupportAgentId from './CustomerSupportAgentId'

class CustomerSupportAgentJoined extends Message {
  public static with(id: CustomerSupportAgentId): CustomerSupportAgentJoined {
    return new this({
      id: id.value,
    })
  }

  public get id(): CustomerSupportAgentId {
    return CustomerSupportAgentId.fromString(this.payload.id)
  }
}

export default CustomerSupportAgentJoined
