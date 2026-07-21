---
title: "Kết luận và những cải tiến trong tương lai"
date: 2026-07-20
weight: 18
chapter: false
pre: "<b>5.18. </b>"
---

## Kết luận

Workshop đã hoàn thành quá trình thiết kế, triển khai và kiểm thử một hệ thống quản lý công việc nhóm trên AWS.

Hệ thống cho phép người dùng đăng nhập, quản lý nhiệm vụ, giao việc, cập nhật trạng thái và theo dõi thời hạn. Ngoài các chức năng chính, hệ thống còn tự động kiểm tra deadline và gửi email nhắc nhở thông qua EventBridge Scheduler, Lambda và Amazon SES.

Kiến trúc được triển khai gồm:

- Amazon S3 lưu trữ frontend tĩnh.
- Amazon CloudFront phân phối nội dung qua HTTPS.
- AWS WAF bảo vệ lớp truy cập từ CloudFront.
- Amazon API Gateway cung cấp HTTP API.
- VPC Link kết nối API Gateway với Internal ALB.
- Amazon EC2 chạy backend Node.js.
- Amazon RDS for PostgreSQL lưu trữ dữ liệu.
- EventBridge Scheduler kích hoạt tác vụ định kỳ.
- AWS Lambda gọi API kiểm tra deadline.
- Amazon SES gửi email nhắc nhở.
- Amazon CloudWatch hỗ trợ ghi log và theo dõi metric.

Frontend và backend được tách thành các thành phần riêng. Backend và database được đặt trong private subnet để hạn chế truy cập trực tiếp từ Internet.

Quá trình triển khai đã kiểm tra các luồng chính:

1. Người dùng truy cập frontend thông qua CloudFront.
2. Request API được chuyển đến API Gateway.
3. API Gateway sử dụng VPC Link để gọi Internal ALB.
4. Internal ALB định tuyến request đến EC2 backend thông qua Target Group.
5. Backend truy vấn RDS PostgreSQL.
6. EventBridge Scheduler kích hoạt Lambda theo lịch.
7. Lambda gọi API kiểm tra deadline.
8. Backend xử lý nhiệm vụ đến hạn và sử dụng Amazon SES để gửi email.

## Kết quả đạt được

Sau workshop, hệ thống đã đạt được các kết quả chính:

- Frontend có thể được truy cập qua CloudFront.
- Backend Node.js hoạt động dưới dạng systemd service trên EC2.
- Target Group nhận diện EC2 backend ở trạng thái healthy.
- API Gateway kết nối được với backend thông qua VPC Link.
- Backend kết nối được với RDS PostgreSQL.
- Người dùng có thể đăng nhập và sử dụng các chức năng quản lý task.
- Lambda có thể gọi API kiểm tra deadline.
- EventBridge Scheduler được cấu hình để kích hoạt Lambda theo lịch.
- Amazon SES có thể gửi email đến địa chỉ đã xác minh.
- CloudWatch ghi nhận log và metric của các dịch vụ.
- AWS WAF được liên kết với CloudFront để tăng cường bảo vệ.
- Kiến trúc được tối ưu theo mô hình Single-AZ cho môi trường demo.

## Những kiến thức đã học được

Qua quá trình thực hiện, tôi hiểu rõ hơn về:

- Cách thiết kế public subnet và private subnet.
- Vai trò của Internet Gateway và NAT Gateway.
- Cách sử dụng route table để kiểm soát đường đi của lưu lượng.
- Cách Security Group giới hạn kết nối giữa các tầng.
- Cách triển khai backend trong private subnet.
- Cách API Gateway truy cập tài nguyên private thông qua VPC Link.
- Vai trò của Internal ALB trong việc đưa request từ VPC Link đến Target Group.
- Cách ALB thực hiện health check cho backend.
- Cách kết nối EC2 với Amazon RDS.
- Cách triển khai frontend tĩnh bằng S3 và CloudFront.
- Cách sử dụng EventBridge Scheduler và Lambda cho tác vụ định kỳ.
- Cách sử dụng Amazon SES trong sandbox.
- Cách kiểm tra log và metric bằng CloudWatch.
- Cách cân bằng giữa chi phí, bảo mật và tính sẵn sàng.

Một bài học quan trọng là kiến trúc cần được thiết kế phù hợp với nhu cầu thực tế. Multi-AZ mang lại khả năng chịu lỗi tốt hơn nhưng không phải lúc nào cũng cần thiết đối với môi trường học tập. Ngược lại, Single-AZ giúp giảm chi phí nhưng phải chấp nhận rủi ro gián đoạn cao hơn.

## Hạn chế hiện tại

Hệ thống hiện tại vẫn còn một số hạn chế:

- Chỉ triển khai workload chính trong một Availability Zone.
- Chỉ sử dụng một EC2 backend.
- Chưa có Auto Scaling.
- Chưa có cơ chế failover tự động.
- RDS đang sử dụng Single-AZ.
- Amazon SES vẫn hoạt động trong sandbox.
- Chỉ các địa chỉ email đã xác minh mới nhận được email.
- Chưa có tên miền riêng.
- Chưa cấu hình HTTPS giữa Internal ALB và backend.
- Chưa có quy trình CI/CD hoàn chỉnh.
- Quá trình triển khai phần lớn vẫn thực hiện thủ công.
- Chưa có hệ thống backup và khôi phục được kiểm thử đầy đủ.
- Chưa triển khai cơ chế quản lý secret chuyên dụng.
- Monitoring hiện chủ yếu tập trung vào log, metric và health check cơ bản.
- Chưa thực hiện kiểm thử tải với số lượng người dùng lớn.

## Cải tiến về tính sẵn sàng

Nếu triển khai trong production, hệ thống có thể được mở rộng theo hướng Multi-AZ:

- Tạo public và private subnet tại ít nhất hai Availability Zone.
- Triển khai nhiều EC2 backend.
- Sử dụng Auto Scaling Group.
- Cấu hình Internal ALB phân phối request đến nhiều instance.
- Chuyển RDS sang Multi-AZ.
- Kiểm thử khả năng failover.

Các thay đổi này giúp giảm nguy cơ gián đoạn khi một instance hoặc Availability Zone gặp sự cố.

## Cải tiến về bảo mật

Các cải tiến bảo mật có thể thực hiện:

- Sử dụng AWS Secrets Manager hoặc AWS Systems Manager Parameter Store để lưu thông tin nhạy cảm.
- Không lưu database password trực tiếp trong file `.env`.
- Sử dụng IAM Role theo nguyên tắc quyền tối thiểu.
- Hạn chế outbound rule của Security Group.
- Sử dụng HTTPS cho kết nối giữa Internal ALB và backend.
- Cấu hình AWS WAF với các rule phù hợp với lưu lượng thực tế.
- Bật access logging cho CloudFront và ALB.
- Bật AWS CloudTrail để theo dõi các thao tác quản trị.
- Cấu hình rotation cho secret.
- Xem xét sử dụng Amazon Cognito cho xác thực người dùng.

## Cải tiến về triển khai

Quy trình triển khai hiện tại có thể được tự động hóa bằng:

- GitHub Actions.
- AWS CodePipeline.
- AWS CodeBuild.
- AWS CodeDeploy.
- Infrastructure as Code.

Các tài nguyên AWS có thể được mô tả bằng:

- AWS CloudFormation.
- AWS CDK.
- Terraform.

Việc sử dụng Infrastructure as Code giúp:

- Tái tạo môi trường nhanh hơn.
- Giảm lỗi do cấu hình thủ công.
- Dễ kiểm tra thay đổi.
- Dễ triển khai nhiều môi trường.
- Hỗ trợ rollback khi triển khai thất bại.

## Cải tiến về giám sát

Hệ thống có thể được bổ sung trong tương lai:

- CloudWatch Alarm cho Lambda Errors.
- Alarm cho ALB `UnHealthyHostCount`.
- Alarm cho API Gateway 5XX.
- Alarm cho EC2 `CPUUtilization`.
- Alarm cho RDS `DatabaseConnections`.
- Amazon SNS notification gửi cảnh báo qua email.
- CloudWatch Dashboard tổng hợp trạng thái hệ thống.
- Log retention policy để kiểm soát chi phí lưu log.

Trong phiên bản workshop hiện tại, phần giám sát tập trung vào log, metric và trạng thái health check. Các alarm trên là hướng mở rộng khi hệ thống được triển khai lâu dài, không phải thành phần đã hoàn thành trong workshop.

## Cải tiến về chức năng

Ứng dụng có thể được bổ sung:

- Phân quyền chi tiết hơn giữa Manager và Member.
- Thông báo thời gian thực.
- Đính kèm file vào task.
- Bình luận và lịch sử thay đổi.
- Báo cáo tiến độ theo tuần.
- Dashboard thống kê công việc.
- Lọc và tìm kiếm nâng cao.
- Phân loại độ ưu tiên tự động.
- Email template chuyên nghiệp hơn.
- Cấu hình thời gian nhắc theo từng người dùng.

## Cải tiến về chi phí

Để tiếp tục tối ưu chi phí:

- Dừng EC2 và tạm dừng RDS khi không sử dụng trong thời gian ngắn.
- Chỉ giữ NAT Gateway trong thời gian cần thiết.
- Xóa Elastic IP không sử dụng.
- Xóa EBS volume và snapshot không cần thiết.
- Thiết lập AWS Budget.
- Kiểm tra Cost Explorer định kỳ.
- Cấu hình thời gian lưu CloudWatch Logs.
- Xem xét VPC Endpoint cho các dịch vụ AWS được sử dụng thường xuyên.
- Đánh giá việc thay thế các thành phần chạy liên tục bằng dịch vụ serverless khi phù hợp.

## Hướng phát triển tổng thể

Trong giai đoạn tiếp theo, hệ thống có thể được phát triển theo lộ trình:

### Giai đoạn 1: Hoàn thiện chức năng

- Cải thiện giao diện.
- Hoàn thiện phân quyền.
- Bổ sung báo cáo và thông báo.
- Tăng cường validation và xử lý lỗi.

### Giai đoạn 2: Tự động hóa triển khai

- Xây dựng CI/CD.
- Áp dụng Infrastructure as Code.
- Tạo môi trường development, staging và production.

### Giai đoạn 3: Tăng tính sẵn sàng

- Chuyển sang Multi-AZ.
- Sử dụng Auto Scaling Group.
- Chuyển RDS sang Multi-AZ.
- Thiết lập backup và kiểm thử khôi phục.

### Giai đoạn 4: Tăng cường bảo mật và giám sát

- Sử dụng Secrets Manager.
- Bổ sung CloudWatch Alarm.
- Bật CloudTrail và access log.
- Đánh giá các rule AWS WAF dựa trên lưu lượng thực tế.

## Tổng kết

Workshop đã giúp tôi hiểu rõ hơn cách các dịch vụ AWS phối hợp trong một hệ thống web nhiều tầng.

Dự án không chỉ tập trung vào việc làm cho ứng dụng hoạt động mà còn xem xét các yếu tố quan trọng như mạng, bảo mật, tự động hóa, giám sát, chi phí và dọn dẹp tài nguyên.

Kiến trúc hiện tại phù hợp với môi trường học tập và trình diễn. Để sử dụng trong production, hệ thống cần tiếp tục được nâng cấp về tính sẵn sàng, bảo mật, tự động hóa triển khai và khả năng giám sát.
