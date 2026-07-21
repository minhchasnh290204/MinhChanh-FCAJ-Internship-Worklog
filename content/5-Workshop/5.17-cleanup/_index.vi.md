---
title: "Dọn dẹp tài nguyên"
date: 2026-07-20
weight: 17
chapter: false
pre: "<b>5.17. </b>"
---

Sau khi hoàn thành workshop, các tài nguyên AWS không còn sử dụng cần được xóa để tránh tiếp tục phát sinh chi phí.

Việc dọn dẹp cần thực hiện theo đúng thứ tự vì một số tài nguyên đang phụ thuộc lẫn nhau. Không nên xóa ngẫu nhiên vì có thể gặp lỗi tài nguyên vẫn đang được sử dụng, chẳng hạn VPC Link còn kết nối với Internal ALB hoặc subnet vẫn còn network interface.

## Lưu ý trước khi dọn dẹp

Trước khi xóa tài nguyên:

- Sao lưu source code lên GitHub.
- Lưu lại các ảnh chụp màn hình phục vụ báo cáo.
- Xuất dữ liệu cần thiết từ Amazon RDS.
- Ghi lại các thông số cấu hình quan trọng.
- Kiểm tra những tài nguyên cần giữ cho dự án khác.
- Không đưa password, Access Key, secret hoặc file `.env` lên GitHub.

Nếu cần giữ dữ liệu database, có thể tạo final snapshot trước khi xóa RDS. Snapshot hỗ trợ khôi phục nhưng vẫn sử dụng dung lượng lưu trữ và có thể tiếp tục phát sinh chi phí. Trước mỗi thao tác, cần kiểm tra đúng AWS Region, tag và tên tài nguyên để tránh xóa nhầm.

## Thứ tự dọn dẹp đề xuất

### Bước 1: Tắt EventBridge Scheduler

Mở Amazon EventBridge Scheduler và chọn lịch:

```text
teamtask-daily-deadline-check
```

Tắt hoặc xóa lịch để ngăn hệ thống tiếp tục kích hoạt Lambda. Scheduler nên được xử lý đầu tiên nhằm tránh phát sinh lượt gọi mới trong khi backend và database đang được dọn dẹp.

### Bước 2: Xóa Lambda kiểm tra deadline

Sau khi Scheduler đã dừng, xóa Lambda:

```text
teamtask-deadline-check-lambda
```

Kiểm tra và xóa các biến môi trường chứa endpoint hoặc secret. IAM Role dành riêng cho Lambda chỉ được xóa sau khi chắc chắn không còn function hoặc dịch vụ nào sử dụng.

### Bước 3: Gỡ AWS WAF khỏi CloudFront

Trước tiên, gỡ Web ACL khỏi CloudFront distribution. Sau khi không còn resource liên kết, có thể xóa các rule và Web ACL được tạo riêng cho workshop.

CloudFront cần được disable trước khi xóa. Quá trình cập nhật và xóa distribution có thể mất thời gian, vì vậy cần chờ trạng thái triển khai hoàn tất trước khi tiếp tục.

### Bước 4: Làm rỗng và xóa S3 bucket

Xóa toàn bộ file frontend trong S3 bucket. Nếu bucket bật versioning, cần xóa cả object version và delete marker trước khi xóa bucket.

Chỉ xóa bucket sau khi CloudFront không còn sử dụng bucket làm origin và các file cần thiết đã được lưu trong source code.

### Bước 5: Xóa API Gateway và VPC Link

Xóa route, integration và stage của HTTP API, sau đó xóa API Gateway. Tiếp theo, xóa VPC Link để giải phóng các network interface được tạo trong VPC.

Phải chờ VPC Link xóa hoàn tất trước khi xóa Internal ALB hoặc subnet liên quan nhằm tránh lỗi dependency.

### Bước 6: Xóa Internal ALB và Target Group

Xóa listener và Internal Application Load Balancer, sau đó xóa Target Group của EC2 backend. Nếu Target Group vẫn còn target được đăng ký, có thể deregister EC2 trước khi xóa.

Internal ALB là điểm vào private VPC của API Gateway, không phải thành phần cần giữ lại sau khi VPC Link đã bị xóa.

### Bước 7: Xóa EC2 backend

Terminate EC2 instance chạy backend Node.js. Sau đó kiểm tra EBS volume, snapshot và Elastic Network Interface liên quan.

Volume được cấu hình xóa cùng instance sẽ được giải phóng tự động. Các volume hoặc snapshot được giữ riêng cần được rà soát và xóa nếu không còn sử dụng.

### Bước 8: Xóa Amazon RDS

Xóa RDS PostgreSQL sau khi đã xuất dữ liệu hoặc tạo final snapshot nếu cần. Nếu chỉ dùng database cho workshop và không cần phục hồi, có thể bỏ qua final snapshot.

Sau khi DB instance bị xóa, kiểm tra các automated backup, manual snapshot, DB subnet group và parameter group được tạo riêng cho dự án. Không xóa snapshot cần giữ cho báo cáo hoặc khôi phục dữ liệu.

### Bước 9: Xóa NAT Gateway và giải phóng Elastic IP

Xóa NAT Gateway và chờ trạng thái chuyển sang `Deleted`. Sau đó release Elastic IP đã cấp cho NAT Gateway.

Nếu chỉ xóa NAT Gateway nhưng không giải phóng Elastic IP không còn sử dụng, địa chỉ IPv4 vẫn có thể tiếp tục phát sinh chi phí.

### Bước 10: Xóa Security Group và hạ tầng mạng

Khi EC2, RDS, Internal ALB, VPC Link và NAT Gateway đã được xóa hoàn toàn, tiếp tục dọn các thành phần mạng theo thứ tự:

1. Security Group của ALB, EC2 và RDS.
2. Các route tùy chỉnh và route table của public/private subnet.
3. Public subnet và private subnet.
4. Detach rồi xóa Internet Gateway.
5. Xóa VPC sau cùng.

Nếu Security Group hoặc subnet chưa thể xóa, cần kiểm tra xem còn network interface hoặc tài nguyên nào đang tham chiếu đến chúng.

### Bước 11: Dọn CloudWatch, IAM và SES

Kiểm tra CloudWatch Log Group, dashboard hoặc metric thử nghiệm và xóa những tài nguyên không còn cần thiết. Xóa IAM policy và IAM Role được tạo riêng cho EC2 hoặc Lambda sau khi các dịch vụ liên quan đã bị xóa.

SES verified identity có thể được giữ nếu vẫn dùng cho dự án khác. Nếu identity chỉ phục vụ workshop, có thể xóa để tài khoản không còn cấu hình dư thừa.

Cuối cùng, kiểm tra Billing, Cost Explorer và AWS Budgets trong những ngày tiếp theo vì dữ liệu chi phí có thể cập nhật trễ. Quá trình dọn dẹp hoàn tất khi không còn tài nguyên ngoài ý muốn và các dịch vụ tính phí liên tục đã được xóa hoặc được chủ động giữ lại với lý do rõ ràng.
