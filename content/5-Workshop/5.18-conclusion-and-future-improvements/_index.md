---
title: "Conclusion and Future Improvements"
date: 2026-07-20
weight: 18
chapter: false
pre: "<b>5.18. </b>"
---

## Conclusion

The workshop completed the design, deployment, and testing of a team task-management system on AWS.

The system allows users to sign in, manage and assign tasks, update statuses, and track deadlines. In addition to these core functions, EventBridge Scheduler, Lambda, and Amazon SES automatically check deadlines and deliver reminder emails.

The deployed architecture includes:

- Amazon S3 for static frontend storage.
- Amazon CloudFront for HTTPS content delivery.
- AWS WAF for protecting the CloudFront access layer.
- Amazon API Gateway for the HTTP API.
- VPC Link for connecting API Gateway to the Internal ALB.
- Amazon EC2 for the Node.js backend.
- Amazon RDS for PostgreSQL for application data.
- EventBridge Scheduler for recurring invocations.
- AWS Lambda for calling the deadline-check API.
- Amazon SES for reminder email delivery.
- Amazon CloudWatch for logs and metrics.

The frontend and backend are separate components. The backend and database run in private subnets to limit direct Internet access.

The deployment tested the main flows:

1. A user accesses the frontend through CloudFront.
2. API requests are sent to API Gateway.
3. API Gateway uses VPC Link to reach the Internal ALB.
4. The Internal ALB routes requests to the EC2 backend through the target group.
5. The backend queries RDS PostgreSQL.
6. EventBridge Scheduler invokes Lambda according to its schedule.
7. Lambda calls the deadline-check API.
8. The backend processes due tasks and uses Amazon SES to send email.

## Achieved results

The workshop produced the following results:

- The frontend is accessible through CloudFront.
- The Node.js backend runs as a systemd service on EC2.
- The target group reports the EC2 backend as healthy.
- API Gateway reaches the backend through VPC Link.
- The backend connects to RDS PostgreSQL.
- Users can sign in and use task-management functions.
- Lambda can call the deadline-check API.
- EventBridge Scheduler is configured to invoke Lambda on a schedule.
- Amazon SES can send email to a verified address.
- CloudWatch records service logs and metrics.
- AWS WAF is associated with CloudFront for additional protection.
- The architecture is optimized as a Single-AZ demonstration environment.

## Knowledge gained

Through this implementation, I gained a clearer understanding of:

- Designing public and private subnets.
- The roles of Internet Gateway and NAT Gateway.
- Using route tables to control traffic paths.
- Using security groups to restrict communication between layers.
- Deploying a backend in a private subnet.
- Allowing API Gateway to reach private resources through VPC Link.
- Using the Internal ALB to route VPC Link requests to a target group.
- How an ALB performs backend health checks.
- Connecting EC2 to Amazon RDS.
- Deploying a static frontend with S3 and CloudFront.
- Using EventBridge Scheduler and Lambda for recurring work.
- Using Amazon SES in the sandbox environment.
- Reviewing logs and metrics with CloudWatch.
- Balancing cost, security, and availability.

An important lesson is that architecture should match actual requirements. Multi-AZ provides stronger fault tolerance but is not always necessary in a learning environment. Single-AZ reduces cost but accepts a higher risk of interruption.

## Current limitations

The current system still has several limitations:

- The main workload runs in one Availability Zone.
- Only one EC2 backend is deployed.
- Auto Scaling is not configured.
- Automatic failover is not available.
- RDS uses Single-AZ.
- Amazon SES remains in the sandbox.
- Only verified email addresses can receive email.
- No custom domain is configured.
- HTTPS is not configured between the Internal ALB and backend.
- A complete CI/CD process is not available.
- Most deployment operations remain manual.
- Backup and recovery have not been tested comprehensively.
- No dedicated secret-management mechanism is deployed.
- Monitoring primarily covers basic logs, metrics, and health checks.
- Load testing with a large user population has not been performed.

## Availability improvements

For production, the system can evolve toward Multi-AZ:

- Create public and private subnets in at least two Availability Zones.
- Deploy multiple EC2 backend instances.
- Use an Auto Scaling Group.
- Configure the Internal ALB to distribute requests across instances.
- Move RDS to Multi-AZ.
- Test failover behavior.

These changes reduce interruption risk when an instance or Availability Zone fails.

## Security improvements

Potential security improvements include:

- Store sensitive data in AWS Secrets Manager or AWS Systems Manager Parameter Store.
- Do not store the database password directly in `.env` files.
- Apply least privilege to IAM roles.
- Restrict security-group outbound rules.
- Use HTTPS between the Internal ALB and backend.
- Tune AWS WAF rules for actual traffic.
- Enable access logging for CloudFront and the ALB.
- Enable AWS CloudTrail for administrative activity tracking.
- Configure secret rotation.
- Consider Amazon Cognito for user authentication.

## Deployment improvements

The current deployment process can be automated with:

- GitHub Actions.
- AWS CodePipeline.
- AWS CodeBuild.
- AWS CodeDeploy.
- Infrastructure as Code.

AWS resources can be defined with:

- AWS CloudFormation.
- AWS CDK.
- Terraform.

Infrastructure as Code provides:

- Faster environment recreation.
- Fewer manual configuration errors.
- Easier change review.
- Repeatable deployment across environments.
- Rollback support after a failed deployment.

## Monitoring improvements

Future monitoring can add:

- A CloudWatch alarm for Lambda Errors.
- An alarm for ALB `UnHealthyHostCount`.
- An alarm for API Gateway 5XX responses.
- An alarm for EC2 `CPUUtilization`.
- An alarm for RDS `DatabaseConnections`.
- Amazon SNS email notifications.
- A CloudWatch dashboard summarizing system health.
- Log retention policies for controlling storage cost.

The current workshop monitoring scope focuses on logs, metrics, and health-check status. These alarms are future improvements for a long-running deployment, not components already completed in the workshop.

## Functional improvements

The application can add:

- More detailed Manager and Member authorization.
- Real-time notifications.
- File attachments for tasks.
- Comments and change history.
- Weekly progress reports.
- A task analytics dashboard.
- Advanced filtering and search.
- Automatic priority classification.
- More professional email templates.
- Per-user reminder schedules.

## Cost improvements

Further cost optimization can include:

- Stop EC2 and temporarily stop RDS during short unused periods.
- Keep NAT Gateway only while required.
- Release unused Elastic IP addresses.
- Delete unnecessary EBS volumes and snapshots.
- Configure AWS Budgets.
- Review Cost Explorer regularly.
- Configure CloudWatch Logs retention.
- Evaluate VPC endpoints for frequently used AWS services.
- Consider replacing continuously running components with serverless services where appropriate.

## Overall development roadmap

The next stages can follow this roadmap:

### Phase 1: Complete application functions

- Improve the user interface.
- Complete authorization behavior.
- Add reports and notifications.
- Strengthen validation and error handling.

### Phase 2: Automate deployment

- Build CI/CD pipelines.
- Adopt Infrastructure as Code.
- Create development, staging, and production environments.

### Phase 3: Improve availability

- Move toward Multi-AZ.
- Use an Auto Scaling Group.
- Move RDS to Multi-AZ.
- Configure backups and test recovery.

### Phase 4: Strengthen security and monitoring

- Use Secrets Manager.
- Add CloudWatch alarms.
- Enable CloudTrail and access logs.
- Review AWS WAF rules using actual traffic.

## Summary

The workshop improved my understanding of how AWS services cooperate in a multi-tier web system.

The project considered not only making the application work but also networking, security, automation, monitoring, cost, and resource cleanup.

The current architecture is suitable for learning and demonstration. A production deployment requires further improvements in availability, security, deployment automation, and observability.
