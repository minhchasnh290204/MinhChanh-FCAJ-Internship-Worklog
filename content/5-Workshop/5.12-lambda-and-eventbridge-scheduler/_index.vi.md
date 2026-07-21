---
title: "Lambda và EventBridge Scheduler"
date: 2026-07-20
weight: 12
pre: " <b> 5.12. </b> "
chapter: false
---

Tạo Lambda gọi deadline-check API được bảo vệ. Lưu endpoint và secret header dưới dạng cấu hình được bảo vệ, đặt timezone Scheduler `Asia/Ho_Chi_Minh`, chạy test event và kiểm tra email cùng CloudWatch log.

## Luồng nhắc hạn tự động

1. Tạo và deploy Lambda nhắc deadline.
2. Cấu hình `DEADLINE_CHECK_URL` và `INTERNAL_LAMBDA_SECRET` nhưng không để lộ giá trị trong ảnh hoặc Git. Với production, ưu tiên cấu hình mã hóa hoặc Secrets Manager.
3. Tạo EventBridge schedule và cấp quyền invoke Lambda.
4. Chạy test, đọc Lambda logs và xác nhận email đến đúng hộp thư.

![Lambda nhắc deadline](/images/5-Workshop/teamtask-deployment/step-41.png)

![EventBridge Scheduler](/images/5-Workshop/teamtask-deployment/step-42.png)

![Scheduler kích hoạt Lambda](/images/5-Workshop/teamtask-deployment/step-43.png)

![Kết quả test và log Lambda](/images/5-Workshop/teamtask-deployment/step-44.png)

![Email nhắc hạn được nhận](/images/5-Workshop/teamtask-deployment/step-45.png)


