---
title: "API Gateway và VPC Link"
date: 2026-07-20
weight: 9
pre: " <b> 5.9. </b> "
chapter: false
---

Tạo HTTP API, VPC Link và private integration đến ALB listener. Thêm route `ANY /`, `ANY /{proxy+}`, deploy và test invoke URL. Với HTTP 503, kiểm tra target health, listener rule, Security Group, trạng thái VPC Link, integration URI và log.

## Triển khai private API

1. Tạo VPC Link trong VPC/subnet có thể kết nối Internal ALB.
2. Tạo API Gateway HTTP API và integration đến Internal ALB listener.
3. Thêm root/proxy route, deploy API và test invoke URL.
4. Nếu gặp HTTP 503, kiểm tra target healthy, listener forwarding, Security Group và trạng thái VPC Link `AVAILABLE`.

![Cấu hình VPC Link](/images/5-Workshop/teamtask-deployment/step-24.png)

![Cấu hình HTTP API](/images/5-Workshop/teamtask-deployment/step-25.png)

![Deploy API](/images/5-Workshop/teamtask-deployment/step-26.png)

![Kết quả test API](/images/5-Workshop/teamtask-deployment/step-28.png)


