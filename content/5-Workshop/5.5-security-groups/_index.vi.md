---
title: "Nhóm bảo mật"
date: 2026-07-20
weight: 5
pre: " <b> 5.5. </b> "
chapter: false
---

Cho phép HTTP 80 đến ALB theo nhu cầu; backend TCP 3000 chỉ nhận từ ALB SG; PostgreSQL 5432 chỉ nhận từ backend SG. Không mở trực tiếp EC2/RDS ra Internet.

## Chuỗi Security Group

1. Tạo Security Group cho Internal ALB và HTTP listener cần dùng.
2. Tạo EC2 backend SG, chỉ cho phép port ứng dụng `3000` từ ALB SG.
3. Tạo PostgreSQL SG, chỉ cho phép port `5432` từ EC2 backend SG.
4. Rà soát outbound rule và xóa inbound rule không cần thiết.

![Security Group Internal ALB](/images/5-Workshop/teamtask-deployment/step-14.png)

![Security Group EC2 backend](/images/5-Workshop/teamtask-deployment/step-15.png)


