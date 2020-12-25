import CustomerSupportIssue from '../Issue/CustomerSupportIssue'
import CustomerSupportIssueId from '../Issue/CustomerSupportIssueId'
import CustomerSupportAgentId from './CustomerSupportAgentId'

abstract class CustomerSupportIssueRepository {
  abstract save(issue: CustomerSupportIssue): Promise<void>

  abstract findActiveByAssignee(id: CustomerSupportAgentId): Promise<CustomerSupportIssue[]>

  abstract get(id: CustomerSupportIssueId): Promise<CustomerSupportIssue>

  abstract findOne(id: CustomerSupportIssueId): Promise<CustomerSupportIssue | null>

  abstract findOneAvailableIssue(): Promise<CustomerSupportIssue | null>
}

export default CustomerSupportIssueRepository
