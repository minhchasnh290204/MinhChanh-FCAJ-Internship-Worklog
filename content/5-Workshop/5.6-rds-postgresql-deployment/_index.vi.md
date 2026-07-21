---
title: "Triển khai RDS PostgreSQL"
date: 2026-07-20
weight: 6
pre: " <b> 5.6. </b> "
chapter: false
---

Tạo RDS private Single-AZ `task-postgres-db` và database `taskdb`. Lưu credential ngoài Git, kết nối `psql` từ EC2, tạo schema và seed dữ liệu demo không nhạy cảm. Ghi nhận truy vấn thành công.

## Thực hiện trên Console

1. Mở Amazon RDS và tạo PostgreSQL database.
2. Chọn private DB subnet group và PostgreSQL Security Group.
3. Tắt public access; chỉ dùng Single-AZ cho môi trường học tập/demo.
4. Chờ trạng thái `Available`, test kết nối từ EC2 và lưu kết quả truy vấn thành công.

![Tạo RDS database](/images/5-Workshop/teamtask-deployment/step-19.png)


