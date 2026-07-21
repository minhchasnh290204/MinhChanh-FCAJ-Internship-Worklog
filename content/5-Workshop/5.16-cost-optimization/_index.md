---
title: "Cost Optimization"
date: 2026-07-20
weight: 16
chapter: false
pre: "<b>5.16. </b>"
---

The objective of this section is to reduce operating cost in a learning and demonstration environment while retaining all core task-management and automated deadline-reminder functions.

The initial architecture was designed with production-like components that support future scaling and deployment across multiple Availability Zones. However, this project serves a small number of users, runs for a short demonstration period, and does not require commercial-grade availability. The workshop architecture is therefore adjusted to a Single-AZ model with small resource configurations.

## Main optimization decisions

### Use a Single-AZ model

The main system workload runs in one Availability Zone without a standby server or database. This reduces the number of resources that must be maintained throughout the workshop.

Amazon RDS uses Single-AZ instead of Multi-AZ. This is suitable for a workshop because automatic failover is not required.

Single-AZ reduces cost but also lowers fault tolerance. The application may become unavailable if the Availability Zone has a failure. This configuration is therefore intended for learning and demonstrations rather than production.

### Use a small EC2 instance

The Node.js backend runs on one `t3.micro` EC2 instance. This configuration is sufficient for the application's low traffic and small user population.

The system does not use multiple EC2 instances or an Auto Scaling Group because load-based scaling is not currently required. One server reduces compute cost and simplifies administration. EC2 can be stopped outside practice periods to reduce compute charges, although its attached EBS volume continues to incur storage cost until deleted.

### Host the frontend on S3 and CloudFront

The frontend consists only of static HTML, CSS, and JavaScript files. It is therefore stored in Amazon S3 instead of running on a separate EC2 web server.

Amazon CloudFront distributes the content, supports HTTPS, and caches assets at edge locations. This approach reduces backend load and avoids maintaining another server. Its cost mainly depends on stored data, request volume, and delivered data.

### Use Lambda for scheduled processing

EventBridge Scheduler invokes Lambda according to the configured schedule. Lambda sends a request to the backend deadline-check API. The backend queries Amazon RDS for approaching deadlines and uses Amazon SES to send reminder emails.

Processing flow:

```text
EventBridge Scheduler
        ↓
AWS Lambda
        ↓
Deadline-check API
        ↓
EC2 Backend
        ↓
Amazon RDS
        ↓
Amazon SES
```

Lambda runs only when EventBridge invokes it, so no dedicated server is required for the scheduled task. With one daily workshop invocation, Lambda and EventBridge usage remains low and fits the pay-per-use model.

### Use a small RDS configuration

Amazon RDS for PostgreSQL stores accounts, tasks, statuses, and deadlines. The workshop uses a small Single-AZ DB instance because its data volume and connection count are low.

Backups and snapshots should be retained only when recovery or report evidence is required. Obsolete snapshots should be deleted because they continue to consume storage after the DB instance is removed.

### Control NAT Gateway and Internal ALB lifetime

NAT Gateway provides outbound access for the backend in the private subnet, while the Internal ALB is the private VPC entry point used by API Gateway through VPC Link. These components are required by the current architecture but incur charges for provisioned time even when traffic is low.

In a demonstration environment, they should exist only during deployment and testing. After the required evidence has been retained, delete the NAT Gateway and release its Elastic IP, then delete the unused Internal ALB and target group.

## Budget monitoring and control

AWS Budgets tracks AWS Credit usage and sends notifications when cost reaches configured thresholds. Cost Explorer and Billing help identify the services generating the largest cost.

The project applies the following controls:

- Tag resources with `Project`, `Environment`, and `Owner`.
- Review EC2, RDS, NAT Gateway, Internal ALB, Elastic IP, and WAF regularly.
- Configure appropriate CloudWatch Logs retention.
- Limit EventBridge Scheduler frequency and inspect Lambda retries after errors.
- Delete resources immediately after testing and report evidence collection are complete.

## Estimated cost

The project estimate is approximately **109 AWS Credits** when all resources run continuously for one month. The recommended budget is **120 AWS Credits**, including contingency for additional traffic, logs, or deployment time.

NAT Gateway, Amazon RDS, and the Internal ALB account for most of the fixed cost. Reducing their lifetime and running cleanup immediately after the workshop are therefore the most effective cost-saving actions.

The optimized design is appropriate for learning and demonstration. A production deployment must reassess Multi-AZ, Auto Scaling, backups, monitoring, and recovery. These capabilities increase cost but are required for stronger availability and operational resilience.
