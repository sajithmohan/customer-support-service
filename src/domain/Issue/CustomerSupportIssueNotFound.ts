import CustomerSupportIssueId from './CustomerSupportIssueId'

class CustomerSupportIssueNotFound extends Error {
  private constructor(message: string) {
    super(message)
  }

  public static forId(id: CustomerSupportIssueId): CustomerSupportIssueNotFound {
    return new this(`Customer Support Issue not found for id ${id.value}`)
  }
}

export default CustomerSupportIssueNotFound
