---
title: "Resource Cleanup"
date: 2026-07-20
weight: 17
chapter: false
pre: "<b>5.17. </b>"
---

After completing the workshop, AWS resources that are no longer used should be deleted to prevent further charges.

Cleanup must follow the correct order because several resources depend on one another. Deleting resources randomly may produce in-use errors, such as when VPC Link still connects to the Internal ALB or a subnet still contains a network interface.

## Before cleanup

Before deleting resources:

- Back up the source code to GitHub.
- Retain screenshots required for the report.
- Export any required data from Amazon RDS.
- Record important configuration values.
- Identify resources that another project must retain.
- Never upload passwords, access keys, secrets, or `.env` files to GitHub.

If database data must be retained, create a final snapshot before deleting RDS. A snapshot enables recovery but continues to use storage and may incur cost. Before every operation, verify the AWS Region, resource tags, and resource name to avoid deleting the wrong environment.

## Recommended cleanup order

### Step 1: Disable EventBridge Scheduler

Open Amazon EventBridge Scheduler and select:

```text
teamtask-daily-deadline-check
```

Disable or delete the schedule so that it no longer invokes Lambda. Scheduler should be handled first to prevent new invocations while the backend and database are being removed.

### Step 2: Delete the deadline-check Lambda

After Scheduler has stopped, delete:

```text
teamtask-deadline-check-lambda
```

Review and remove environment variables containing endpoints or secrets. Delete the dedicated Lambda IAM role only after confirming that no function or service still uses it.

### Step 3: Detach AWS WAF from CloudFront

First, disassociate the Web ACL from the CloudFront distribution. Once no resource uses it, delete the workshop-specific rules and Web ACL.

CloudFront must be disabled before deletion. Distribution updates and deletion may take time, so wait for deployment status to complete before continuing.

### Step 4: Empty and delete the S3 bucket

Remove all frontend files from the S3 bucket. If versioning is enabled, delete object versions and delete markers before deleting the bucket.

Delete the bucket only after CloudFront no longer uses it as an origin and the required files are retained in source control.

### Step 5: Delete API Gateway and VPC Link

Remove HTTP API routes, integrations, and stages, then delete the API Gateway API. Delete VPC Link next so that its network interfaces are released.

Wait for VPC Link deletion to complete before removing the Internal ALB or related subnets to avoid dependency errors.

### Step 6: Delete the Internal ALB and target group

Delete the listener and Internal Application Load Balancer, followed by the EC2 backend target group. If targets remain registered, deregister the EC2 instance before deletion.

The Internal ALB is API Gateway's private VPC entry point and does not need to remain after VPC Link is removed.

### Step 7: Delete the backend EC2 instance

Terminate the EC2 instance running the Node.js backend. Review its related EBS volumes, snapshots, and Elastic Network Interfaces afterward.

A volume configured for delete-on-termination is released automatically. Separately retained volumes or snapshots should be reviewed and deleted when no longer needed.

### Step 8: Delete Amazon RDS

Delete RDS PostgreSQL after exporting data or creating a final snapshot when required. If the database exists only for the workshop and recovery is unnecessary, the final snapshot can be skipped.

After deletion, review automated backups, manual snapshots, the DB subnet group, and project-specific parameter groups. Do not delete a snapshot retained for reporting or recovery.

### Step 9: Delete the NAT Gateway and release its Elastic IP

Delete the NAT Gateway and wait until its status becomes `Deleted`. Then release the Elastic IP allocated to it.

Deleting the NAT Gateway without releasing an unused Elastic IP may leave an IPv4-related charge.

### Step 10: Delete security groups and network infrastructure

After EC2, RDS, the Internal ALB, VPC Link, and NAT Gateway have been fully removed, clean up the network in this order:

1. ALB, EC2, and RDS security groups.
2. Custom routes and public/private route tables.
3. Public and private subnets.
4. Detach and delete the Internet Gateway.
5. Delete the VPC last.

If a security group or subnet cannot be deleted, check for remaining network interfaces or resources that still reference it.

### Step 11: Clean up CloudWatch, IAM, and SES

Review CloudWatch log groups, dashboards, or test metrics and remove those that are no longer required. Delete IAM policies and roles created specifically for EC2 or Lambda after their related services have been removed.

An SES verified identity may be retained when another project still uses it. Otherwise, it can be removed to avoid unused account configuration.

Finally, monitor Billing, Cost Explorer, and AWS Budgets during the following days because cost data may update later. Cleanup is complete when no unintended resource remains and continuously charged services have either been removed or deliberately retained for a documented reason.
