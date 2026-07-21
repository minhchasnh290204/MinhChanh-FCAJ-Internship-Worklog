---
title: "Proposal"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---


### WORKSHOP PROPOSAL CONTENT

#### Deploying a Team Task Management Application on AWS

* **Topic:** Building a team task management application with frontend, backend, database, and automated deadline reminders via email
* **Deployment model:** Cost-optimized AWS single-AZ architecture for learning, demo, and internship reporting purposes
* **Key services:** VPC, EC2, RDS, ALB, API Gateway, S3, CloudFront, SES, Lambda, EventBridge, WAF

| Project name | AWS Team Task Management |
| --- | --- |
| **Objective** | Manage tasks, track progress, and automatically send deadline reminder emails |
| **Workshop audience** | Students/team members who want to understand the process of deploying a web app on AWS |
| **Deliverables** | Application accessible via CloudFront, private backend, RDS database, and automated deadline reminder flow |

---

### Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Architecture](#3-solution-architecture)
4. [AWS Services Used](#4-aws-services-used)
5. [Component Design](#5-component-design)
6. [Technical Deployment](#6-technical-deployment)
7. [Schedule and Deployment Milestones](#7-schedule-and-deployment-milestones)
8. [Budget Estimate](#8-budget-estimate)
9. [Risk Assessment](#9-risk-assessment)
10. [Expected Outcomes](#10-expected-outcomes)
11. [Workshop Demo Scenario](#11-workshop-demo-scenario)
12. [Conclusion](#12-conclusion)

---

### 1. Executive Summary

This workshop presents the process of designing and deploying a Team Task Management application on AWS. The application allows managers to create and assign tasks to team members, track progress via a Kanban board, update task status, and automatically send reminder emails when tasks are approaching or past their deadline.

The system is deployed with a cost-saving approach while still adhering to basic security principles. The frontend is hosted on Amazon S3 and distributed via Amazon CloudFront. The Node.js backend runs on Amazon EC2 in a private subnet, without direct exposure to the Internet. Users access the API through Amazon API Gateway, which connects to the backend via VPC Link and an Internal Application Load Balancer.

Application data is stored in Amazon RDS PostgreSQL. The deadline email functionality is handled by Amazon SES. Additionally, AWS Lambda combined with Amazon EventBridge Scheduler is used to automatically check deadlines daily. AWS WAF is attached to CloudFront to enhance protection against malicious requests.

---

### 2. Problem Statement

#### 2.1 What is the problem?

In team collaboration, managing tasks through messages, personal notes, or scattered files easily leads to confusion. Managers struggle to track who is working on what, which tasks are approaching their deadline, which have been completed, and which are overdue.

Without an automated reminder mechanism, team members may forget deadlines, affecting the group's overall progress. Furthermore, when deploying a web application to the cloud, if the backend and database are exposed directly to the Internet, the system carries higher security risks.

#### 2.2 Proposed solution

The solution is to build a team task management platform on AWS. The application provides a web interface for users to log in, create tasks, assign tasks, update status, and track progress. The backend is placed in a private subnet to restrict direct access from the Internet. Users only enter the system through CloudFront and API Gateway.

The system uses EventBridge Scheduler to trigger Lambda on a fixed schedule. Lambda calls the internal API `/internal/deadline-check`; the backend checks for tasks approaching or past their deadline, then sends reminder emails through Amazon SES.

---

### 3. Solution Architecture

The project architecture is divided into four main layers: user access layer, API layer, backend processing layer, and data/automation layer. This division helps make the system easy to explain in the workshop while clearly demonstrating the mindset for deploying web applications on AWS.

#### 3.1 Frontend access flow

- Users access the application through the CloudFront domain.
- CloudFront distributes static frontend files stored on S3.
- WAF is attached to CloudFront to filter abnormal requests before they go deeper into the system.

#### 3.2 API call flow

- The frontend calls the API through API Gateway.
- API Gateway uses VPC Link to connect to the Internal ALB.
- The Internal ALB forwards requests to the EC2 backend running Node.js/Express.
- The backend processes business logic and reads/writes data to RDS PostgreSQL.

#### 3.3 Automated deadline reminder flow

- EventBridge Scheduler runs on a daily schedule.
- EventBridge triggers the deadline-check Lambda.
- Lambda calls the backend's internal API with a secret header.
- The backend checks for tasks approaching or past their deadline.
- If there are tasks that need reminders, the backend sends emails through Amazon SES.

---

### 4. AWS Services Used

| Service | Role in the project |
| --- | --- |
| **Amazon VPC** | Creates a private network environment, dividing public and private subnets for the application. |
| **Amazon EC2** | Runs the Node.js/Express backend in a private subnet. |
| **Amazon RDS PostgreSQL** | Stores user data, tasks, status, and deadlines. |
| **Internal Application Load Balancer** | Receives requests from API Gateway via VPC Link and forwards them to the EC2 backend. |
| **Amazon API Gateway** | Provides a public API endpoint and hides the private backend. |
| **Amazon S3** | Stores static frontend files. |
| **Amazon CloudFront** | Distributes the frontend, supports HTTPS, and serves as the WAF attachment point. |
| **Amazon SES** | Sends deadline reminder emails to team members. |
| **AWS Lambda** | Calls the deadline check API without maintaining a separate always-on server. |
| **Amazon EventBridge Scheduler** | Schedules automatic daily Lambda triggers. |
| **AWS WAF** | Filters malicious requests and adds a protection layer for the web application. |

---

### 5. Component Design

#### 5.1 Frontend

The frontend is the task management interface, including the login screen, Kanban Task Board, task creation form, and an area to view simulated emails or check mail sending history. After building, the frontend is uploaded to S3 and distributed via CloudFront.

#### 5.2 Backend

The backend is built with Node.js/Express, handling APIs such as login, fetching task lists, creating tasks, updating task status, and checking deadlines. The backend runs as a systemd service on EC2 so it can automatically restart when the server reboots.

#### 5.3 Database

The database uses PostgreSQL on Amazon RDS. RDS resides in a private subnet and only allows the EC2 backend to connect via port 5432. This design prevents the database from being publicly exposed to the Internet.

#### 5.4 Email notification

Amazon SES is used to send deadline reminder emails. In the sandbox environment, both sender and recipient emails must be verified. When moving to production, an AWS request is needed to remove sandbox restrictions if you want to send to unverified email addresses.

#### 5.5 Automation

Lambda does not directly handle all deadline business logic; it acts as a trigger. Lambda calls the backend's internal endpoint; the backend checks data in RDS and sends emails if needed. This approach keeps business logic centralized in the backend, making it easier to maintain.

---

### 6. Technical Deployment

#### 6.1 Phase 1 - AWS network design

Create a dedicated VPC for the project, then create a public subnet, private app subnet, and private database subnet. The public subnet is used for the NAT Gateway and components that need Internet connectivity. Private subnets are used for the backend and database.

The Public Route Table is configured with a 0.0.0.0/0 route to the Internet Gateway. The backend's Private Route Table is configured with a 0.0.0.0/0 route to the NAT Gateway so EC2 can download packages or update source code without needing a public IP.

#### 6.2 Phase 2 - Security Groups and IAM Role

Security Groups are separated by component: ALB, EC2 backend, and RDS. The backend only accepts traffic from the ALB, while RDS only accepts traffic from the backend. The IAM Role for EC2 is granted the necessary permissions to access SSM, S3, CloudFront invalidation, and SES as required for deployment.

#### 6.3 Phase 3 - Deploy RDS and EC2

Create RDS PostgreSQL in the private subnet, then launch the EC2 backend in the private app subnet. On EC2, install Node.js, Git, clone the source code, configure the .env file, install packages, and run the backend as a systemd service.

#### 6.4 Phase 4 - Create Target Group, Internal ALB, and API Gateway

Create a Target Group pointing to the EC2 backend on port 3000. Then create an Internal ALB to receive internal requests. API Gateway is configured with a VPC Link to the ALB listener, routing ANY / and ANY /{proxy+} to forward all requests to the backend.

#### 6.5 Phase 5 - Deploy frontend to S3 and CloudFront

The frontend is uploaded to S3. CloudFront is created to distribute the frontend over HTTPS. After each frontend update, a CloudFront invalidation is needed to prevent users from receiving cached old files.

#### 6.6 Phase 6 - Configure SES, Lambda, and EventBridge

SES is used to verify sender and recipient emails. The deadline-check Lambda is deployed with environment variables DEADLINE_CHECK_URL and INTERNAL_LAMBDA_SECRET. EventBridge Scheduler is configured to trigger Lambda on a daily schedule.

#### 6.7 Phase 7 - Add WAF

AWS WAF is attached to CloudFront to block malicious requests. You can start with AWS Managed Rules, then add rate-limiting rules or IP blocking as needed.

---

### 7. Schedule and Deployment Milestones

| Timeline | Activities |
| --- | --- |
| **Week 1** | Requirements analysis, AWS architecture design, and source code preparation. |
| **Week 2** | Create VPC, subnets, route tables, security groups, IAM roles, and RDS. |
| **Week 3** | Deploy backend on EC2, configure systemd, create ALB, API Gateway, and VPC Link. |
| **Week 4** | Deploy frontend to S3/CloudFront, configure SES, Lambda, EventBridge, and test the email sending flow. |
| **Post-deployment** | Cost optimization, add WAF, write documentation, and prepare workshop demo. |

---

### 8. Budget Estimate

Since the project serves learning and internship reporting purposes, the architecture is tuned toward a single-AZ model to reduce costs. This model is suitable for demos and small workloads but is not the optimal choice for production systems requiring high availability.

Main cost categories include EC2, RDS PostgreSQL, NAT Gateway, Internal ALB, API Gateway, S3, CloudFront, SES, Lambda, EventBridge, and WAF. Among these, NAT Gateway, ALB, and RDS typically require the most attention as they can incur hourly running costs.

- Shut down or delete unused resources after the demo.
- Use single-AZ for learning purposes to reduce costs compared to Multi-AZ.
- Set up AWS Budget to alert when costs exceed a threshold.
- Only enable NAT Gateway, ALB, and RDS during testing periods if you want to save credits.
- Use S3/CloudFront for the frontend because of low cost and suitability for static web hosting.

---

### 9. Risk Assessment

| Risk | Impact | Mitigation |
| --- | --- | --- |
| EC2 backend stopped | High | Use systemd to auto-restart the service; check logs on errors. |
| RDS connection failure | High | Check Security Group, subnet, endpoint, port 5432, and environment variables. |
| API Gateway returns 503 error | Medium | Check VPC Link, ALB listener, Target Group, and health check. |
| SES fails to send email | Medium | Verify emails, check SES sandbox, spam folder, and backend logs. |
| CloudFront serves cached old files | Low | Create invalidation after uploading new frontend files. |
| Costs exceed estimate | Medium | Set up AWS Budget and delete unused resources. |
| Malicious requests or bots | Medium | Attach WAF to CloudFront and enable AWS Managed Rules. |



---

### 10. Expected Outcomes

After the workshop, participants will understand how to deploy a real-world web application on AWS with a model that includes frontend, backend, database, and automation.

- Frontend accessible through CloudFront.
- Node.js backend running stably on EC2 in a private subnet.
- RDS PostgreSQL operational and accessible only by the backend.
- API Gateway connected to the backend via VPC Link and Internal ALB.
- SES successfully sending deadline reminder emails.
- Lambda and EventBridge automatically checking deadlines on schedule.
- WAF configured to enhance application protection.

---

### 11. Workshop Demo Scenario

1. Access the Team Task Management application through CloudFront.
2. Log in with a manager or member account.
3. Manager creates a new task and assigns it to a member.
4. Member updates task status on the Kanban board.
5. Verify task data has been saved to RDS PostgreSQL.
6. Manually call the deadline-check API to test the email sending flow.
7. Check deadline reminder emails in Gmail or the simulated SES inbox interface.
8. Trigger Lambda or EventBridge to demonstrate the automated flow.
9. Explain how WAF protects requests passing through CloudFront.

---

### 12. Conclusion

Through this project, the team has built a task management system deployed on AWS with all the essential components of a cloud application: frontend hosting, private backend, database, API gateway, automated email sending, scheduled jobs, and security with WAF.

The project focuses not only on getting the application running, but also on understanding why subnets need to be divided, why the backend should be placed in a private subnet, why API Gateway and VPC Link are needed, and how AWS services work together to form a complete system.

In the future, the system can be extended with features such as real user registration, advanced role-based access control, analytics dashboards, data backup, monitoring with CloudWatch, or Multi-AZ deployment when higher availability is required.