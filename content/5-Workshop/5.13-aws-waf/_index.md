---
title: "AWS WAF"
date: 2026-07-20
weight: 13
pre: " <b> 5.13. </b> "
chapter: false
---

Associate a Web ACL with CloudFront. Evaluate AWS Managed Rules for Common Rule Set, Known Bad Inputs, and IP Reputation, then add a rate-based rule. Begin in Count mode where appropriate and test both allowed and blocked requests.

## Web ACL deployment

1. Create a CloudFront-scope Web ACL in the required WAF scope/region context.
2. Add selected managed rule groups and a rate-based rule, beginning in Count mode when impact is uncertain.
3. Associate the Web ACL with the CloudFront distribution.
4. Send normal and abnormal test requests and confirm the expected allowed, counted, or blocked result in WAF metrics.

![Attach AWS WAF to CloudFront](/images/5-Workshop/teamtask-deployment/step-46.png)

