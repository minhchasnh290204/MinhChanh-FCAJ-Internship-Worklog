---
title: "Hội thảo"
date: 2024-01-01
weight: 5
chapter: false
pre: " <b> 5. </b> "
---

# Hệ thống Quản lý Nhiệm vụ Nhóm - Dự án Capstone

## Tổng quan dự án

Hệ thống Quản lý Nhiệm vụ Nhóm là một ứng dụng web cloud-native được xây dựng trên AWS, thể hiện các mô hình kiến trúc cấp doanh nghiệp cho cộng tác nhóm và tự động hóa quy trình làm việc. Dự án này giới thiệu các quy tắc thực hành tốt nhất trong bảo mật, khả năng mở rộng và tự động hóa sử dụng các dịch vụ AWS.

### Mục tiêu dự án

- Xây dựng một ứng dụng web hoàn chỉnh với các thành phần frontend, backend và cơ sở dữ liệu
- Giới thiệu kiến trúc an toàn với cơ sở hạ tầng backend riêng tư
- Triển khai thông báo tự động về hạn chót nhiệm vụ
- Triển khai và quản lý các ứng dụng cloud-native ở quy mô lớn
- Tích hợp nhiều dịch vụ AWS vào một giải pháp liền mạch

### Các điểm nổi bật kiến trúc

Dự án triển khai kiến trúc bốn lớp:

1. **Lớp Truy cập Người dùng**: CloudFront distribution với WAF protection
2. **Lớp API**: API Gateway với VPC Link tới Internal ALB
3. **Lớp Backend**: Node.js/Express trên EC2 ở mạng con riêng
4. **Lớp Dữ liệu & Tự động hóa**: RDS PostgreSQL, Lambda, EventBridge, SES

### Tính năng chính

- **Bảng Kanban Nhiệm vụ**: Giao diện quản lý nhiệm vụ trực quan
- **Xác thực Người dùng**: Đăng nhập an toàn và truy cập dựa trên vai trò
- **Thông báo Tự động**: Nhắc nhở email cho những hạn chót sắp tới
- **Kiến trúc Có thể Mở rộng**: Cơ sở hạ tầng có khả năng auto-scaling
- **Bảo mật Trước hết**: Backend riêng tư, WAF protection, security groups

### Dịch vụ AWS được Tích hợp

- Amazon VPC (mạng)
- Amazon EC2 (tính toán)
- Amazon RDS PostgreSQL (cơ sở dữ liệu)
- Amazon API Gateway (quản lý API)
- Amazon CloudFront (CDN)
- Amazon S3 (lưu trữ frontend)
- AWS Lambda (tự động hóa)
- Amazon EventBridge (lập lịch)
- Amazon SES (email)
- AWS WAF (bảo mật)

## Các Mô-đun Hội thảo

1. [Tổng quan Dự án](5.1-Workshop-overview)
2. [Chuẩn bị & Thiết lập](5.2-Prerequiste/)
3. [Cấu hình S3 & VPC](5.3-S3-vpc/)
4. [Tích hợp On-Premises](5.4-S3-onprem/)
5. [Chính sách Bảo mật](5.5-Policy/)
6. [Dọn dẹp & Thực hành Tốt nhất](5.6-Cleanup/)
