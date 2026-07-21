---
title: "Network Infrastructure"
date: 2026-07-20
weight: 4
pre: " <b> 5.4. </b> "
chapter: false
---

Create VPC `10.0.0.0/16`, public subnet `10.0.1.0/24`, private app subnet `10.0.11.0/24`, private DB subnet `10.0.12.0/24`, an Internet Gateway, NAT Gateway, and route tables. RDS normally requires a DB subnet group spanning at least two Availability Zones; add a second private DB subnet with a non-overlapping CIDR before creating RDS.

## Deployment evidence and procedure

1. Create the project VPC and confirm its IPv4 CIDR.
2. Create the public, private application, and private database subnets. Place database subnets in distinct Availability Zones when building the RDS DB subnet group.
3. Create and attach an Internet Gateway.
4. Create the public route table, add `0.0.0.0/0` through the Internet Gateway, and associate the public subnet.
5. Allocate an Elastic IP and create the NAT Gateway in the public subnet.
6. Create the private route table and route outbound traffic through the NAT Gateway.

![VPC creation](/images/5-Workshop/teamtask-deployment/step-01.png)

![Public subnet](/images/5-Workshop/teamtask-deployment/step-02.png)

![Private application subnet](/images/5-Workshop/teamtask-deployment/step-03.png)

![Private database subnet](/images/5-Workshop/teamtask-deployment/step-04.png)

![Database subnet configuration](/images/5-Workshop/teamtask-deployment/step-05.png)

![Internet Gateway creation](/images/5-Workshop/teamtask-deployment/step-06.png)

![Attach Internet Gateway](/images/5-Workshop/teamtask-deployment/step-07.png)

![Public route table](/images/5-Workshop/teamtask-deployment/step-08.png)

![Default internet route](/images/5-Workshop/teamtask-deployment/step-09.png)

![Public subnet association](/images/5-Workshop/teamtask-deployment/step-10.png)

![NAT Gateway](/images/5-Workshop/teamtask-deployment/step-11.png)

![Private route table](/images/5-Workshop/teamtask-deployment/step-12.png)

![Private default route through NAT](/images/5-Workshop/teamtask-deployment/step-13.png)

## Verification

> Add a masked screenshot and the observed result after completing this chapter.
