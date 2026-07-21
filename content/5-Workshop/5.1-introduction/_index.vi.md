---
title: "Giới thiệu"
date: 2026-07-20
weight: 1
pre: " <b> 5.1. </b> "
chapter: false
---

Xác định bài toán, người dùng Manager/Member, luồng cốt lõi và kết quả. Bổ sung ảnh kiến trúc đã review.

## Người dùng và chức năng

- **Manager:** tạo, giao, cập nhật và theo dõi task.
- **Member:** xem task được giao và cập nhật tiến độ/trạng thái.
- **Tự động hóa:** phát hiện deadline sắp tới và gửi email nhắc.

## Kết quả đầu ra

Frontend HTTPS qua CloudFront, backend Node.js và PostgreSQL private, nhắc hạn tự động, WAF và kết quả test có thể quan sát.

## Kiến trúc hoàn chỉnh

![Kiến trúc Team Task Management trên AWS](/images/team-task-management-architecture.png)

Sơ đồ thể hiện cả luồng tương tác của Manager/Member và luồng tự động nhắc deadline theo lịch. Các chương tiếp theo triển khai và kiểm tra từng thành phần theo thứ tự phụ thuộc.


