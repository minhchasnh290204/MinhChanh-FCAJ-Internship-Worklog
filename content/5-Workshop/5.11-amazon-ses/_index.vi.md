---
title: "Amazon SES"
date: 2026-07-20
weight: 11
pre: " <b> 5.11. </b> "
chapter: false
---

Verify sender/recipient khi tài khoản còn trong SES Sandbox. Gửi email test, kiểm tra spam và suppression list, rồi tích hợp AWS SDK vào backend qua IAM Role.

## Verify SES và test thủ công

1. Verify sender identity và recipient identity khi SES còn ở Sandbox.
2. Gửi thủ công email nhắc task gần deadline và kiểm tra cả thư mục spam.
3. Tích hợp SES qua IAM Role của backend; không lưu access key trong ứng dụng.

![Khởi tạo và verify Amazon SES](/images/5-Workshop/teamtask-deployment/step-39.png)

![Email nhắc deadline thủ công](/images/5-Workshop/teamtask-deployment/step-40.png)

