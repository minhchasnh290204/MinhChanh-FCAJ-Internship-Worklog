---
title: "API Gateway and VPC Link"
date: 2026-07-20
weight: 9
pre: " <b> 5.9. </b> "
chapter: false
---

Create an HTTP API, VPC Link, and private integration to the ALB listener. Add `ANY /` and `ANY /{proxy+}` routes, deploy, and test the invoke URL. For HTTP 503, inspect target health, listener rules, security groups, VPC Link state, integration URI, and logs.

## Private API deployment

1. Create the VPC Link in the VPC and subnets that can reach the internal ALB.
2. Create an API Gateway HTTP API and integrate it with the internal ALB listener.
3. Add the root and proxy routes, deploy the API, and test the invoke URL.
4. If the response is HTTP 503, verify the target is healthy, the listener forwards correctly, security groups allow the path, and the VPC Link is `AVAILABLE`.

![VPC Link configuration](/images/5-Workshop/teamtask-deployment/step-24.png)

![HTTP API configuration](/images/5-Workshop/teamtask-deployment/step-25.png)

![API deployment](/images/5-Workshop/teamtask-deployment/step-26.png)

![API test result](/images/5-Workshop/teamtask-deployment/step-28.png)

