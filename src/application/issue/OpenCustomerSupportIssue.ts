import CustomerId from '@domain/CustomerId'
import Message from 'utils/messaging/Message'
import CustomerSupportIssueTitle from '@domain/Issue/CustomerSupportIssueTitle'
import CustomerSupportIssueDescription from '../../domain/Issue/CustomerSupportIssueDescription'

class OpenCustomerSupportIssue extends Message {
  public static createFrom(
    customerId: CustomerId,
    title: CustomerSupportIssueTitle,
    description: CustomerSupportIssueDescription,
  ): OpenCustomerSupportIssue {
    return new this({
      customer_id: customerId.value,
      title: title.value,
      description: description.value,
    })
  }

  get customerId(): CustomerId {
    return CustomerId.fromString(this.payload.customer_id)
  }

  get title(): CustomerSupportIssueTitle {
    return CustomerSupportIssueTitle.fromString(this.payload.title)
  }

  get description(): CustomerSupportIssueDescription {
    return CustomerSupportIssueDescription.fromString(this.payload.description)
  }
}

export default OpenCustomerSupportIssue
