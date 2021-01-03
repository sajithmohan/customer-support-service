# customer-support-service

Service handles customer support issues

* users can report an issue.
* New issues should be automatically assigned to a free support agent.
*  Support agents can only handle one issue at a time.(concurrency issues  not handled yet)
* Support agents resolve issues: once done the issue is marked as resolved
and the support agent becomes available to take a new issue.
* The system should be able to assign unassigned issues automatically when a
support agent joins or becomes available.

## Supported APIs(check postman collection for more details)
* POST /customer-support-agents/ to join new agent
* POST /customer-support-issues/ to report issue
* PUT /customer-support-issues/:id/status to update status(to resolve)
To run

```cli
docker-compose  -f docker/docker-compose.yml up --build
```
To try APIs use postman collection from 
https://www.getpostman.com/collections/5aa2272f1a993753ca16
