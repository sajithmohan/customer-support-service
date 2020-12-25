import CustomerId from '@domain/CustomerId'
import CustomerSupportIssueTitle from '@domain/Issue/CustomerSupportIssueTitle'
import Message from 'utils/messaging/Message'
import CustomerSupportIssueDescription from './CustomerSupportIssueDescription'
import CustomerSupportIssueId from './CustomerSupportIssueId'

class CustomerSupportIssueOpened extends Message {
  public static with(
    id: CustomerSupportIssueId,
    customerId: CustomerId,
    title: CustomerSupportIssueTitle,
    description: CustomerSupportIssueDescription,
  ): CustomerSupportIssueOpened {
    return new this({
      id: id.value,
      customer_id: customerId.value,
      title: title.value,
      description: description.value,
    })
  }

  get id():CustomerSupportIssueId {
    return CustomerSupportIssueId.fromString(this.payload.id)
  }
}

export default CustomerSupportIssueOpened
