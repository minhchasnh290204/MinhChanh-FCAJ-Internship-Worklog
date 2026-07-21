---
title: "Target Group và Internal ALB"
date: 2026-07-20
weight: 8
pre: " <b> 5.8. </b> "
chapter: false
---

Tạo Target Group HTTP:3000 và health check, đăng ký EC2, sau đó tạo Internal ALB listener HTTP:80. Listener này là đích private integration mà API Gateway truy cập thông qua VPC Link. Chỉ tiếp tục khi target ở trạng thái `Healthy`.

## Target Group và điểm vào private trong VPC

Mặc dù tên dịch vụ AWS là **Application Load Balancer**, workshop này không dùng ALB để phân phối traffic cho nhiều backend instance. Target Group hiện chỉ có một EC2 instance. Vai trò chính của ALB là cung cấp private listener được VPC Link hỗ trợ và định tuyến request đến backend mà không cần cấp public IP cho EC2.

1. Tạo instance Target Group trên backend port `3000` và cấu hình health-check path của ứng dụng.
2. Đăng ký EC2 backend; xử lý Security Group, service hoặc health path đến khi target `Healthy`.
3. Tạo Application Load Balancer loại **internal**, forward HTTP listener đến Target Group và dùng listener này làm đích private integration của API Gateway.

![Tạo Target Group](/images/5-Workshop/teamtask-deployment/step-21.png)

![Đăng ký và kiểm tra target](/images/5-Workshop/teamtask-deployment/step-22.png)

![Tạo Internal Application Load Balancer](/images/5-Workshop/teamtask-deployment/step-23.png)

