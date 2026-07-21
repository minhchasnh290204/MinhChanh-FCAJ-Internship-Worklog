---
title: "Amazon SES"
date: 2026-07-20
weight: 11
pre: " <b> 5.11. </b> "
chapter: false
---

Verify sender and recipient identities while the account is in the SES Sandbox. Send a test email, check spam and the suppression list, and integrate the AWS SDK into the backend through an IAM role.

## SES verification and manual test

1. Verify the sender identity and, while in Sandbox, the recipient identity.
2. Send a manual near-deadline reminder and confirm delivery, including the spam folder.
3. Integrate SES through the backend IAM role; do not store access keys in the application.

![Initialize and verify Amazon SES](/images/5-Workshop/teamtask-deployment/step-39.png)

![Manual deadline reminder email](/images/5-Workshop/teamtask-deployment/step-40.png)

