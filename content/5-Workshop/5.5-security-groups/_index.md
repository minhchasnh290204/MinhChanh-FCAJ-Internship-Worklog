---
title: "Security Groups"
date: 2026-07-20
weight: 5
pre: " <b> 5.5. </b> "
chapter: false
---

Allow HTTP 80 to the ALB as required; allow backend TCP 3000 only from the ALB security group; allow PostgreSQL 5432 only from the backend security group. Do not expose EC2 or RDS directly to the internet.

## Security-group chain

1. Create an Internal ALB security group for the required HTTP listener.
2. Create the EC2 backend security group and allow application port `3000` only from the ALB security group.
3. Create the PostgreSQL security group and allow port `5432` only from the EC2 backend security group.
4. Review outbound rules and remove any inbound rule that is not required.

![Internal ALB security group](/images/5-Workshop/teamtask-deployment/step-14.png)

![EC2 backend security group](/images/5-Workshop/teamtask-deployment/step-15.png)

