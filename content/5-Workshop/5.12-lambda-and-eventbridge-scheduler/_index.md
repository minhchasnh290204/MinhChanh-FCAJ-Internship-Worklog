---
title: "Lambda and EventBridge Scheduler"
date: 2026-07-20
weight: 12
pre: " <b> 5.12. </b> "
chapter: false
---

Create a Lambda function that calls the protected deadline-check API. Store endpoint and secret header as protected configuration, set Scheduler timezone to `Asia/Ho_Chi_Minh`, invoke a test event, and verify the email and CloudWatch log.

## Automated reminder flow

1. Create and deploy the deadline-reminder Lambda function.
2. Configure `DEADLINE_CHECK_URL` and `INTERNAL_LAMBDA_SECRET` without exposing their values in screenshots or Git. Prefer encrypted configuration or Secrets Manager for production.
3. Create the EventBridge schedule and grant it permission to invoke Lambda.
4. Trigger a test, inspect Lambda logs, and confirm that the reminder reaches the intended mailbox.

![Deadline-reminder Lambda](/images/5-Workshop/teamtask-deployment/step-41.png)

![EventBridge Scheduler](/images/5-Workshop/teamtask-deployment/step-42.png)

![Scheduler triggers Lambda](/images/5-Workshop/teamtask-deployment/step-43.png)

![Lambda test and log result](/images/5-Workshop/teamtask-deployment/step-44.png)

![Reminder delivered to a real mailbox](/images/5-Workshop/teamtask-deployment/step-45.png)

