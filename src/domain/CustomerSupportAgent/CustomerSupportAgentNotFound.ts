import CustomerSupportAgentId from './CustomerSupportAgentId'

class CustomerSupportAgentNotFound extends Error {
  private constructor(message: string) {
    super(message)
  }

  public static forId(id: CustomerSupportAgentId): CustomerSupportAgentNotFound {
    return new this(`Customer support agent not found for id ${id.value}`)
  }
}

export default CustomerSupportAgentNotFound
