---
title: "Tối ưu hóa chi phí"
date: 2026-07-20
weight: 16
chapter: false
pre: "<b>5.16. </b>"
---

Mục tiêu của phần này là giảm chi phí vận hành hệ thống trong môi trường học tập và trình diễn, đồng thời vẫn giữ được đầy đủ các chức năng chính của ứng dụng quản lý công việc và nhắc hạn tự động.

Kiến trúc ban đầu được xây dựng theo hướng gần với môi trường production, trong đó có các thành phần hỗ trợ khả năng mở rộng và có thể triển khai trên nhiều Availability Zone. Tuy nhiên, dự án chỉ phục vụ số lượng người dùng nhỏ, thời gian demo ngắn và không yêu cầu mức độ sẵn sàng cao như hệ thống thương mại. Vì vậy, kiến trúc workshop được điều chỉnh theo hướng Single-AZ và sử dụng tài nguyên có cấu hình nhỏ.

## Các quyết định tối ưu chính

### Sử dụng mô hình Single-AZ

Khối lượng xử lý chính của hệ thống được đặt trong một Availability Zone và không triển khai máy chủ hoặc database dự phòng. Cách này giúp giảm số lượng tài nguyên phải duy trì trong suốt thời gian workshop.

Amazon RDS được cấu hình theo chế độ Single-AZ thay vì Multi-AZ. Đây là lựa chọn phù hợp với môi trường workshop vì hệ thống không yêu cầu khả năng failover tự động.

Single-AZ giúp tiết kiệm chi phí nhưng cũng làm giảm khả năng chịu lỗi. Nếu Availability Zone gặp sự cố, ứng dụng có thể bị gián đoạn. Vì vậy, cấu hình này chỉ phù hợp cho môi trường học tập và demo, không phải cấu hình khuyến nghị cho production.

### Sử dụng EC2 có cấu hình nhỏ

Backend Node.js được triển khai trên một EC2 `t3.micro`. Cấu hình này đáp ứng được lưu lượng thấp và số lượng người dùng nhỏ của ứng dụng.

Hệ thống không sử dụng nhiều EC2 instance hoặc Auto Scaling Group vì chưa có nhu cầu mở rộng theo tải. Việc chỉ sử dụng một máy chủ giúp giảm chi phí tính toán và đơn giản hóa quá trình quản trị. Khi không thực hành, EC2 có thể được dừng để giảm phí compute; tuy nhiên, EBS volume gắn với máy vẫn tiếp tục phát sinh chi phí lưu trữ cho đến khi bị xóa.

### Lưu trữ frontend trên S3 và CloudFront

Frontend của ứng dụng chỉ gồm các file tĩnh như HTML, CSS và JavaScript. Vì vậy, frontend được lưu trữ trên Amazon S3 thay vì chạy trên một EC2 riêng.

Amazon CloudFront được sử dụng để phân phối nội dung, hỗ trợ HTTPS và cache dữ liệu tại edge location. Cách triển khai này giúp giảm tải cho backend và không cần duy trì thêm web server. Chi phí chủ yếu phụ thuộc vào dung lượng lưu trữ, số request và lượng dữ liệu được phân phối.

### Sử dụng Lambda cho tác vụ theo lịch

EventBridge Scheduler kích hoạt Lambda theo lịch đã cấu hình. Lambda gửi request đến API kiểm tra deadline của backend. Backend truy vấn Amazon RDS để tìm các công việc sắp đến hạn và sử dụng Amazon SES để gửi email nhắc nhở.

Luồng xử lý:

```text
EventBridge Scheduler
        ↓
AWS Lambda
        ↓
API kiểm tra deadline
        ↓
EC2 Backend
        ↓
Amazon RDS
        ↓
Amazon SES
```

Lambda chỉ chạy khi được EventBridge kích hoạt nên không cần duy trì một máy chủ riêng cho tác vụ theo lịch. Với tần suất một lần mỗi ngày trong workshop, số lượt gọi Lambda và EventBridge thấp, phù hợp với mô hình trả phí theo mức sử dụng.

### Sử dụng RDS cấu hình nhỏ

Amazon RDS for PostgreSQL được sử dụng để lưu tài khoản, công việc, trạng thái và deadline. Môi trường workshop sử dụng DB instance nhỏ và Single-AZ vì lượng dữ liệu và số kết nối thấp.

Backup và snapshot chỉ nên được lưu khi cần phục hồi dữ liệu hoặc làm minh chứng. Snapshot không còn sử dụng cần được xóa vì vẫn chiếm dung lượng lưu trữ ngay cả khi DB instance đã bị xóa.

### Kiểm soát NAT Gateway và Internal ALB

NAT Gateway cung cấp đường outbound cho backend trong private subnet, còn Internal ALB là điểm vào private VPC cho API Gateway thông qua VPC Link. Đây là hai thành phần cần thiết cho kiến trúc hiện tại nhưng vẫn phát sinh chi phí theo thời gian tồn tại, kể cả khi lưu lượng thấp.

Trong môi trường demo, hai tài nguyên này chỉ nên được duy trì trong thời gian triển khai và kiểm thử. Sau khi đã lưu đủ minh chứng, cần xóa NAT Gateway, giải phóng Elastic IP, đồng thời xóa Internal ALB và Target Group không còn sử dụng.

## Theo dõi và kiểm soát ngân sách

AWS Budgets được sử dụng để theo dõi mức tiêu thụ AWS Credit và gửi cảnh báo khi chi phí đạt đến các ngưỡng đã đặt. Cost Explorer và trang Billing hỗ trợ xác định dịch vụ nào đang phát sinh chi phí nhiều nhất.

Các biện pháp kiểm soát được áp dụng gồm:

- Gắn tag `Project`, `Environment` và `Owner` cho tài nguyên.
- Kiểm tra định kỳ EC2, RDS, NAT Gateway, Internal ALB, Elastic IP và WAF.
- Đặt thời gian lưu phù hợp cho CloudWatch Logs.
- Giới hạn tần suất EventBridge Scheduler và kiểm tra Lambda retry khi có lỗi.
- Xóa tài nguyên ngay sau khi hoàn thành kiểm thử và lưu đủ nội dung báo cáo.

## Chi phí dự kiến

Theo dự toán của dự án, hệ thống cần khoảng **109 AWS Credit** nếu tất cả tài nguyên được duy trì liên tục trong một tháng. Ngân sách đề xuất là **120 AWS Credit**, bao gồm phần dự phòng cho traffic, log hoặc thời gian triển khai phát sinh.

NAT Gateway, Amazon RDS và Internal ALB là các thành phần chiếm phần lớn chi phí cố định. Vì vậy, cách tiết kiệm hiệu quả nhất đối với workshop là giảm thời gian tồn tại của các tài nguyên này và thực hiện cleanup ngay sau khi hoàn thành.

Thiết kế tối ưu hiện tại phù hợp với môi trường học tập và trình diễn. Nếu chuyển sang production, cần đánh giá lại Multi-AZ, Auto Scaling, backup, giám sát và khả năng phục hồi; các tính năng này làm tăng chi phí nhưng cần thiết để nâng cao độ sẵn sàng và an toàn vận hành.
