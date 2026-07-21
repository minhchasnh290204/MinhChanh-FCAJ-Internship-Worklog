---
title: "Introduction"
date: 2026-07-20
weight: 1
pre: " <b> 5.1. </b> "
chapter: false
---

Define the problem, Manager/Member users, core flows, and expected result. Add the reviewed architecture image.

## Target users and functions

- **Manager:** create, assign, update, and review tasks.
- **Member:** view assigned tasks and update progress/status.
- **Automation:** detect approaching deadlines and send email reminders.

## Expected output

A CloudFront HTTPS frontend, a private Node.js backend and PostgreSQL database, automated reminders, WAF protection, and observable test results.

## Final architecture

![Team Task Management architecture on AWS](/images/2-Proposal/team-task-management-architecture.png)

The diagram shows both the interactive Manager/Member request path and the scheduled deadline-reminder path. The following chapters deploy and verify each component in dependency order.


