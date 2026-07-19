---
title: "Workshop"
date: 2024-01-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

# Team Task Management System - Capstone Project

## Project Overview

The Team Task Management System is a cloud-native web application built on AWS that demonstrates enterprise-grade architecture patterns for team collaboration and workflow automation. This project showcases best practices in security, scalability, and automation using AWS services.

### Project Objectives

- Build a complete web application with frontend, backend, and database components
- Demonstrate secure architecture with private backend infrastructure
- Implement automated task deadline notifications
- Deploy and manage cloud-native applications at scale
- Integrate multiple AWS services into a cohesive solution

### Architecture Highlights

The project implements a four-layer architecture:

1. **User Access Layer**: CloudFront distribution with WAF protection
2. **API Layer**: API Gateway with VPC Link to Internal ALB
3. **Backend Layer**: Node.js/Express on EC2 in private subnet
4. **Data & Automation Layer**: RDS PostgreSQL, Lambda, EventBridge, SES

### Key Features

- **Kanban Task Board**: Visual task management interface
- **User Authentication**: Secure login and role-based access
- **Automated Notifications**: Email reminders for approaching deadlines
- **Scalable Architecture**: Auto-scaling capable infrastructure
- **Security First**: Private backend, WAF protection, security groups

### AWS Services Integrated

- Amazon VPC (networking)
- Amazon EC2 (compute)
- Amazon RDS PostgreSQL (database)
- Amazon API Gateway (API management)
- Amazon CloudFront (CDN)
- Amazon S3 (frontend storage)
- AWS Lambda (automation)
- Amazon EventBridge (scheduling)
- Amazon SES (email)
- AWS WAF (security)

## Workshop Modules

1. [Project Overview](5.1-Workshop-overview)
2. [Prerequisites & Setup](5.2-Prerequiste/)
3. [S3 & VPC Configuration](5.3-S3-vpc/)
4. [On-Premises Integration](5.4-S3-onprem/)
5. [Security Policies](5.5-Policy/)
6. [Cleanup & Best Practices](5.6-Cleanup/)