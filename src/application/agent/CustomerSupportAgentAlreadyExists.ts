import CustomerSupportAgentId from '../../domain/CustomerSupportAgent/CustomerSupportAgentId'

class CustomerSupportAgentAlreadyExists extends Error {
  private constructor(message?: string) {
    super(message)
  }

  static forId(id: CustomerSupportAgentId): CustomerSupportAgentAlreadyExists {
    return new this(`Customer with id ${id.value} already exists`)
  }
}

export default CustomerSupportAgentAlreadyExists
