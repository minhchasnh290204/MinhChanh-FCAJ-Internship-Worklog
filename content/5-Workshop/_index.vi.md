---
title: "Workshop"
date: 2026-07-20
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

## Tổng quan

Workshop ghi lại cách tôi triển khai ứng dụng quản lý công việc nhóm và tự động nhắc deadline tại AWS region **ap-southeast-1 (Singapore)**. Nội dung được tổ chức thành quy trình có thể thực hiện lại từ chuẩn bị đến triển khai, kiểm thử, giám sát, rà soát chi phí và cleanup.

## Tổng quan kiến trúc

![Kiến trúc Workshop Team Task Management](/images/2-Proposal/team-task-management-architecture.png)

> **Lưu ý kiến trúc:** Internal ALB là điểm vào private integration của VPC Link và định tuyến request đến một EC2 target. Tên dịch vụ vẫn là Application Load Balancer, nhưng workshop không sử dụng khả năng phân phối tải cho nhiều instance.

- **Luồng web:** User → AWS WAF/CloudFront → S3 hoặc API Gateway → VPC Link → Internal ALB private listener → EC2 Target Group → RDS PostgreSQL.
- **Luồng nhắc hạn:** EventBridge → Lambda → deadline-check API → EC2/RDS → NAT Gateway → Amazon SES → email người dùng.
- **Ranh giới bảo mật:** Backend và database nằm trong private subnet; Security Group chỉ cho phép các đường kết nối dịch vụ cần thiết.

## Kết quả mong đợi

- Luồng quản lý task của Manager và Member hoạt động qua frontend HTTPS.
- EC2/RDS nằm private; API Gateway truy cập backend qua VPC Link và Internal ALB listener.
- EventBridge, Lambda và SES gửi email nhắc deadline.
- WAF, CloudWatch, health check và systemd logs cung cấp bảo vệ và minh chứng vận hành.
- Có thể xóa toàn bộ tài nguyên tính phí theo quy trình cleanup.

## Cấu trúc Workshop

| Chương | Nội dung chính |
|---|---|
| [5.1 Giới thiệu](5.1-introduction/) | Bài toán, người dùng, chức năng và kết quả |
| [5.2 Điều kiện tiên quyết](5.2-prerequisites/) | Tài khoản, công cụ, IAM, region và SES identity |
| [5.3 Chuẩn bị mã nguồn](5.3-source-code-preparation/) | Cấu trúc repository, biến môi trường và bảo vệ secret |
| [5.4 Hạ tầng mạng](5.4-network-infrastructure/) | VPC, subnet, IGW, NAT Gateway và route table |
| [5.5 Nhóm bảo mật](5.5-security-groups/) | Đường mạng least privilege từ ALB đến EC2 và RDS |
| [5.6 Triển khai RDS PostgreSQL](5.6-rds-postgresql-deployment/) | Database private, kết nối, schema và seed data |
| [5.7 Triển khai backend EC2](5.7-ec2-backend-deployment/) | IAM Role, Session Manager, Node.js, systemd và health test |
| [5.8 Target Group và Internal ALB](5.8-target-group-and-internal-alb/) | Điểm vào private trong VPC, target health và định tuyến request đến EC2 |
| [5.9 API Gateway và VPC Link](5.9-api-gateway-and-vpc-link/) | Private integration, route, deploy, test và kiểm tra 503 |
| [5.10 Frontend S3 và CloudFront](5.10-s3-and-cloudfront-frontend/) | Upload, khuyến nghị OAC, behavior, HTTPS và cache |
| [5.11 Amazon SES](5.11-amazon-ses/) | Verify identity, Sandbox, email thủ công và tích hợp backend |
| [5.12 Lambda và EventBridge Scheduler](5.12-lambda-and-eventbridge-scheduler/) | Deadline check, lịch chạy, log và kết quả email |
| [5.13 AWS WAF](5.13-aws-waf/) | Managed rule, rate limit, gắn CloudFront và test |
| [5.14 Logging và Monitoring](5.14-logging-and-monitoring/) | CloudWatch, systemd, target health, metric và alarm |
| [5.15 Kiểm thử end-to-end](5.15-end-to-end-testing/) | Ma trận test chức năng, tự động hóa, bảo mật và vận hành |
| [5.16 Tối ưu chi phí](5.16-cost-optimization/) | Tài nguyên demo, nguồn phí theo giờ, Budget và đánh đổi |
| [5.17 Cleanup](5.17-cleanup/) | Xóa tài nguyên theo phụ thuộc và kiểm tra Billing |
| [5.18 Kết luận và hướng phát triển](5.18-conclusion-and-future-improvements/) | Kết quả, xử lý lỗi, bài học và bước tiếp theo |


