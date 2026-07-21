---
title: "Workshop"
date: 2026-07-20
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

## Overview

This workshop documents how I deployed a team task-management application with automated deadline reminders in AWS region **ap-southeast-1 (Singapore)**. It is written as a reproducible path from preparation to deployment, testing, monitoring, cost review, and cleanup.

## Architecture overview

![Team Task Management workshop architecture](/images/2-Proposal/team-task-management-architecture.png)

> **Architecture note:** The Internal ALB is the VPC Link private integration entry point and request router to one EC2 target. The service name remains Application Load Balancer, but multi-instance load distribution is not used in this workshop.

- **Web flow:** User → AWS WAF/CloudFront → S3 or API Gateway → VPC Link → Internal ALB private listener → EC2 Target Group → RDS PostgreSQL.
- **Reminder flow:** EventBridge → Lambda → deadline-check API → EC2/RDS → NAT Gateway → Amazon SES → user email.
- **Security boundary:** The backend and database are placed in private subnets; only the intended service-to-service paths are allowed by security groups.

## Expected result

- Manager and Member task-management flows operate through an HTTPS frontend.
- EC2 and RDS remain private; API Gateway reaches the backend through VPC Link and the Internal ALB listener.
- EventBridge, Lambda, and SES send deadline reminders.
- WAF, CloudWatch, health checks, and systemd logs provide protection and operational evidence.
- All billable resources can be removed through the documented cleanup sequence.

## Workshop structure

| Chapter | Focus |
|---|---|
| [5.1 Introduction](5.1-introduction/) | Problem, users, functions, and expected result |
| [5.2 Prerequisites](5.2-prerequisites/) | Account, tools, IAM permissions, region, and SES identities |
| [5.3 Source Code Preparation](5.3-source-code-preparation/) | Repository layout, environment configuration, and secret safety |
| [5.4 Network Infrastructure](5.4-network-infrastructure/) | VPC, subnets, IGW, NAT Gateway, and route tables |
| [5.5 Security Groups](5.5-security-groups/) | Least-privilege network path from ALB to EC2 and RDS |
| [5.6 RDS PostgreSQL Deployment](5.6-rds-postgresql-deployment/) | Private PostgreSQL database, connection, schema, and seed data |
| [5.7 EC2 Backend Deployment](5.7-ec2-backend-deployment/) | IAM role, Session Manager, Node.js, systemd, and local health test |
| [5.8 Target Group and Internal ALB](5.8-target-group-and-internal-alb/) | Private VPC entry point, target health, and request routing to EC2 |
| [5.9 API Gateway and VPC Link](5.9-api-gateway-and-vpc-link/) | Private integration, routes, deployment, test, and 503 checks |
| [5.10 S3 and CloudFront Frontend](5.10-s3-and-cloudfront-frontend/) | Frontend upload, OAC recommendation, behaviors, HTTPS, and cache |
| [5.11 Amazon SES](5.11-amazon-ses/) | Identity verification, Sandbox, manual email, and backend integration |
| [5.12 Lambda and EventBridge Scheduler](5.12-lambda-and-eventbridge-scheduler/) | Protected deadline checks, schedules, logs, and email result |
| [5.13 AWS WAF](5.13-aws-waf/) | Managed rules, rate limiting, CloudFront association, and tests |
| [5.14 Logging and Monitoring](5.14-logging-and-monitoring/) | CloudWatch, systemd, target health, metrics, and alarms |
| [5.15 End-to-End Testing](5.15-end-to-end-testing/) | Functional, automation, security, and operational test matrix |
| [5.16 Cost Optimization](5.16-cost-optimization/) | Demo sizing, hourly cost drivers, budgets, and trade-offs |
| [5.17 Cleanup](5.17-cleanup/) | Dependency-aware resource deletion and billing verification |
| [5.18 Conclusion and Future Improvements](5.18-conclusion-and-future-improvements/) | Results, troubleshooting, lessons, and next steps |


