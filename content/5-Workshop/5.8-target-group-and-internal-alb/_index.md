---
title: "Target Group and Internal ALB"
date: 2026-07-20
weight: 8
pre: " <b> 5.8. </b> "
chapter: false
---

Create an HTTP:3000 target group and health check, register EC2, then create an Internal ALB with an HTTP:80 listener. The listener is the private integration destination used by API Gateway through VPC Link. Continue only after the target is `Healthy`.

## Target group and private VPC entry point

Although the AWS service is named **Application Load Balancer**, this workshop does not use it to distribute traffic across multiple backend instances. The Target Group currently contains one EC2 instance. Its primary role is to expose a supported private listener for API Gateway VPC Link and route requests to that backend without giving EC2 a public IP.

1. Create an instance target group on backend port `3000` and configure the application health-check path.
2. Register the backend EC2 instance and resolve security-group, service, or health-path issues until it is `Healthy`.
3. Create an **internal** Application Load Balancer, forward its HTTP listener to this Target Group, and use that listener as the API Gateway private integration destination.

![Create target group](/images/5-Workshop/teamtask-deployment/step-21.png)

![Target registration and health](/images/5-Workshop/teamtask-deployment/step-22.png)

![Create internal Application Load Balancer](/images/5-Workshop/teamtask-deployment/step-23.png)


