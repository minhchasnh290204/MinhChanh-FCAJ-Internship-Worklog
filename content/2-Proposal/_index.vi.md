---
title: "Bản đề xuất"
date: 2024-01-01
weight: 2
chapter: false
pre: " <b> 2. </b> "
---


### NỘI DUNG ĐỀ XUẤT WORKSHOP

#### Triển khai ứng dụng Team Task Management trên AWS

* **Chủ đề:** Xây dựng ứng dụng quản lý công việc nhóm có frontend, backend, database và tự động nhắc deadline bằng email
* **Mô hình triển khai:** AWS 1 AZ tối ưu chi phí cho mục đích học tập, demo và báo cáo thực tập
* **Dịch vụ chính:** VPC, EC2, RDS, ALB, API Gateway, S3, CloudFront, SES, Lambda, EventBridge, WAF

| Tên project | AWS Team Task Management |
| --- | --- |
| **Mục tiêu** | Quản lý task, theo dõi tiến độ và tự động gửi email nhắc deadline |
| **Đối tượng workshop** | Sinh viên/thành viên nhóm muốn hiểu quy trình triển khai web app trên AWS |
| **Kết quả đầu ra** | Ứng dụng chạy qua CloudFront, backend private, database RDS và luồng nhắc deadline tự động |

---

### Mục lục nội dung

1. [Tóm tắt chính](#1-tóm-tắt-chính)
2. [Phát biểu vấn đề](#2-phát-biểu-vấn-đề)
3. [Kiến trúc giải pháp](#3-kiến-trúc-giải-pháp)
4. [Các dịch vụ AWS được sử dụng](#4-các-dịch-vụ-aws-được-sử-dụng)
5. [Thiết kế thành phần](#5-thiết-kế-thành-phần)
6. [Triển khai kỹ thuật](#6-triển-khai-kỹ-thuật)
7. [Lịch trình và mốc triển khai](#7-lịch-trình-và-các-mốc-triển-khai)
8. [Dự toán ngân sách](#8-dự-toán-ngân-sách)
9. [Đánh giá rủi ro](#9-đánh-giá-rủi-ro)
10. [Kết quả mong đợi](#10-kết-quả-mong-đợi)
11. [Kịch bản demo workshop](#11-kịch-bản-demo-workshop)
12. [Kết luận](#12-kết-luận)

---

### 1. Tóm tắt chính

Workshop này trình bày quá trình thiết kế và triển khai một ứng dụng Team Task Management trên AWS. Ứng dụng cho phép người quản lý tạo và giao công việc cho thành viên, theo dõi tiến độ theo dạng Kanban board, cập nhật trạng thái công việc và tự động gửi email nhắc nhở khi task gần đến hạn hoặc quá hạn.

Hệ thống được triển khai theo hướng tiết kiệm chi phí nhưng vẫn đảm bảo các nguyên tắc bảo mật cơ bản. Frontend được lưu trữ trên Amazon S3 và phân phối qua Amazon CloudFront. Backend Node.js chạy trên Amazon EC2 trong private subnet, không mở trực tiếp ra Internet. Người dùng truy cập API thông qua Amazon API Gateway, sau đó API Gateway kết nối vào backend thông qua VPC Link và Internal Application Load Balancer.

Dữ liệu của ứng dụng được lưu trong Amazon RDS PostgreSQL. Chức năng gửi email deadline được xử lý bằng Amazon SES. Ngoài ra, AWS Lambda kết hợp với Amazon EventBridge Scheduler được dùng để tự động kiểm tra deadline mỗi ngày. AWS WAF được gắn với CloudFront để tăng khả năng bảo vệ ứng dụng trước các request xấu.

---

### 2. Phát biểu vấn đề

#### 2.1 Vấn đề là gì?

Trong quá trình làm việc nhóm, việc quản lý task bằng tin nhắn, ghi chú riêng hoặc file rời rạc dễ gây nhầm lẫn. Người quản lý khó theo dõi ai đang làm việc gì, task nào sắp đến hạn, task nào đã hoàn thành hoặc task nào đang bị trễ deadline.

Nếu không có cơ chế nhắc nhở tự động, thành viên có thể quên deadline, làm ảnh hưởng đến tiến độ chung của nhóm. Ngoài ra, khi triển khai ứng dụng web lên cloud, nếu backend và database được mở trực tiếp ra Internet thì hệ thống sẽ có rủi ro bảo mật cao hơn.

#### 2.2 Giải pháp đề xuất

Giải pháp là xây dựng một nền tảng quản lý công việc nhóm trên AWS. Ứng dụng có giao diện web để người dùng đăng nhập, tạo task, giao task, cập nhật trạng thái và theo dõi tiến độ. Backend được đặt trong private subnet để hạn chế truy cập trực tiếp từ Internet. Người dùng chỉ đi vào hệ thống thông qua CloudFront và API Gateway.

Hệ thống sử dụng EventBridge Scheduler để kích hoạt Lambda theo lịch cố định. Lambda gọi API nội bộ /internal/deadline-check, backend kiểm tra các task gần đến hạn hoặc quá hạn, sau đó gửi email nhắc nhở thông qua Amazon SES.

---

### 3. Kiến trúc giải pháp

Kiến trúc của project được chia thành bốn lớp chính: lớp truy cập người dùng, lớp API, lớp xử lý backend và lớp dữ liệu/tự động hóa. Cách chia này giúp hệ thống dễ giải thích trong workshop, đồng thời thể hiện rõ tư duy triển khai ứng dụng web trên AWS.

#### 3.1 Luồng truy cập frontend

- Người dùng truy cập ứng dụng thông qua domain CloudFront.
- CloudFront phân phối các file frontend tĩnh được lưu trên S3.
- WAF được gắn với CloudFront để lọc các request bất thường trước khi request đi sâu vào hệ thống.

#### 3.2 Luồng gọi API

- Frontend gọi API thông qua API Gateway.
- API Gateway sử dụng VPC Link để kết nối vào Internal ALB.
- Internal ALB chuyển tiếp request đến EC2 backend đang chạy Node.js/Express.
- Backend xử lý nghiệp vụ và đọc/ghi dữ liệu vào RDS PostgreSQL.

#### 3.3 Luồng tự động nhắc deadline

- EventBridge Scheduler chạy theo lịch hằng ngày.
- EventBridge kích hoạt Lambda deadline-check.
- Lambda gọi API nội bộ của backend kèm secret header.
- Backend kiểm tra các task gần đến hạn hoặc quá hạn.
- Nếu có task cần nhắc, backend gửi email thông qua Amazon SES.

---

### 4. Các dịch vụ AWS được sử dụng

| Dịch vụ | Vai trò trong project |
| --- | --- |
| **Amazon VPC** | Tạo môi trường mạng riêng, chia public subnet và private subnet cho ứng dụng. |
| **Amazon EC2** | Chạy backend Node.js/Express trong private subnet. |
| **Amazon RDS PostgreSQL** | Lưu trữ dữ liệu người dùng, task, trạng thái và deadline. |
| **Internal Application Load Balancer** | Nhận request từ API Gateway qua VPC Link và chuyển tiếp đến backend EC2. |
| **Amazon API Gateway** | Cung cấp endpoint API công khai và che giấu backend private. |
| **Amazon S3** | Lưu trữ frontend static files. |
| **Amazon CloudFront** | Phân phối frontend, hỗ trợ HTTPS và làm điểm gắn WAF. |
| **Amazon SES** | Gửi email nhắc deadline đến thành viên. |
| **AWS Lambda** | Gọi API kiểm tra deadline mà không cần duy trì server chạy nền riêng. |
| **Amazon EventBridge Scheduler** | Lên lịch tự động kích hoạt Lambda mỗi ngày. |
| **AWS WAF** | Lọc request xấu và tăng lớp bảo vệ cho ứng dụng web. |

---

### 5. Thiết kế thành phần

#### 5.1 Frontend

Frontend là giao diện quản lý công việc, bao gồm màn hình đăng nhập, Kanban Task Board, form tạo task, khu vực xem email mô phỏng hoặc kiểm tra lịch sử gửi mail. Sau khi build, frontend được upload lên S3 và phân phối qua CloudFront.

#### 5.2 Backend

Backend được xây dựng bằng Node.js/Express, xử lý các API như đăng nhập, lấy danh sách task, tạo task, cập nhật trạng thái task và kiểm tra deadline. Backend chạy dưới dạng systemd service trên EC2 để có thể tự khởi động lại khi máy chủ reboot.

#### 5.3 Database

Database sử dụng PostgreSQL trên Amazon RDS. RDS nằm trong private subnet và chỉ cho phép backend EC2 kết nối qua port 5432. Cách thiết kế này giúp database không bị public trực tiếp ra Internet.

#### 5.4 Email notification

Amazon SES được dùng để gửi email nhắc nhở deadline. Trong môi trường sandbox, cả email gửi và email nhận cần được verify. Khi chuyển production, cần request AWS để bỏ giới hạn sandbox nếu muốn gửi đến email chưa verify.

#### 5.5 Automation

Lambda không trực tiếp xử lý toàn bộ nghiệp vụ deadline mà đóng vai trò kích hoạt. Lambda gọi endpoint nội bộ của backend, backend kiểm tra dữ liệu trong RDS và gửi email nếu cần. Cách này giúp logic nghiệp vụ tập trung ở backend, dễ bảo trì hơn.

---

### 6. Triển khai kỹ thuật

#### 6.1 Giai đoạn 1 - Thiết kế mạng AWS

Tạo VPC riêng cho project, sau đó tạo public subnet, private app subnet và private database subnet. Public subnet dùng cho NAT Gateway và các thành phần cần giao tiếp Internet. Private subnet dùng cho backend và database.

Public Route Table được cấu hình route 0.0.0.0/0 đến Internet Gateway. Private Route Table của backend được cấu hình route 0.0.0.0/0 đến NAT Gateway để EC2 có thể tải package hoặc cập nhật source code mà không cần public IP.

#### 6.2 Giai đoạn 2 - Security Group và IAM Role

Security Group được tách theo từng thành phần: ALB, EC2 backend và RDS. Backend chỉ nhận traffic từ ALB, còn RDS chỉ nhận traffic từ backend. IAM Role cho EC2 được cấp quyền cần thiết để truy cập SSM, S3, CloudFront invalidation và SES theo nhu cầu triển khai.

#### 6.3 Giai đoạn 3 - Triển khai RDS và EC2

Tạo RDS PostgreSQL trong private subnet, sau đó launch EC2 backend trong private app subnet. Trên EC2, cài Node.js, Git, clone source code, cấu hình file .env, cài package và chạy backend bằng systemd service.

#### 6.4 Giai đoạn 4 - Tạo Target Group, Internal ALB và API Gateway

Tạo Target Group trỏ đến EC2 backend qua port 3000. Sau đó tạo Internal ALB để nhận request nội bộ. API Gateway được cấu hình VPC Link đến listener của ALB, route ANY / và ANY /{proxy+} để chuyển tiếp toàn bộ request đến backend.

#### 6.5 Giai đoạn 5 - Deploy frontend lên S3 và CloudFront

Frontend được upload lên S3. CloudFront được tạo để phân phối frontend qua HTTPS. Sau mỗi lần cập nhật frontend, cần tạo CloudFront invalidation để tránh trường hợp người dùng vẫn nhận file cache cũ.

#### 6.6 Giai đoạn 6 - Cấu hình SES, Lambda và EventBridge

SES được dùng để verify email gửi và email nhận. Lambda deadline-check được triển khai với các biến môi trường DEADLINE_CHECK_URL và INTERNAL_LAMBDA_SECRET. EventBridge Scheduler được cấu hình để kích hoạt Lambda theo lịch hằng ngày.

#### 6.7 Giai đoạn 7 - Bổ sung WAF

AWS WAF được gắn với CloudFront để chặn các request xấu. Có thể bắt đầu bằng AWS Managed Rules, sau đó bổ sung thêm rule giới hạn tốc độ request hoặc chặn IP nếu cần.

---

### 7. Lịch trình và các mốc triển khai

| Mốc thời gian | Nội dung thực hiện |
| --- | --- |
| **Tuần 1** | Phân tích yêu cầu, thiết kế kiến trúc AWS và chuẩn bị source code. |
| **Tuần 2** | Tạo VPC, subnet, route table, security group, IAM role và RDS. |
| **Tuần 3** | Triển khai backend trên EC2, cấu hình systemd, tạo ALB, API Gateway và VPC Link. |
| **Tuần 4** | Deploy frontend lên S3/CloudFront, cấu hình SES, Lambda, EventBridge và kiểm thử luồng gửi email. |
| **Sau triển khai** | Tối ưu chi phí, bổ sung WAF, viết tài liệu và chuẩn bị demo workshop. |

---

### 8. Dự toán ngân sách

Vì project phục vụ học tập và báo cáo thực tập, kiến trúc được tinh chỉnh theo hướng 1 AZ để giảm chi phí. Mô hình này phù hợp cho demo và workload nhỏ, nhưng không phải là lựa chọn tối ưu cho hệ thống production yêu cầu độ sẵn sàng cao.

Các nhóm chi phí chính gồm EC2, RDS PostgreSQL, NAT Gateway, Internal ALB, API Gateway, S3, CloudFront, SES, Lambda, EventBridge và WAF. Trong đó, NAT Gateway, ALB và RDS thường là các thành phần cần chú ý nhất vì có thể phát sinh chi phí theo giờ chạy.

- Tắt hoặc xóa tài nguyên không dùng sau khi demo.
- Dùng single-AZ cho mục đích học tập để giảm chi phí so với Multi-AZ.
- Đặt AWS Budget để cảnh báo khi chi phí vượt ngưỡng.
- Chỉ bật NAT Gateway, ALB, RDS trong thời gian cần kiểm thử nếu muốn tiết kiệm credit.
- Dùng S3/CloudFront cho frontend vì chi phí thấp và phù hợp với static web.

---

### 9. Đánh giá rủi ro

| Rủi ro | Tác động | Cách giảm thiểu |
| --- | --- | --- |
| EC2 backend bị dừng | Cao | Dùng systemd để tự restart service, kiểm tra log khi lỗi. |
| RDS không kết nối được | Cao | Kiểm tra Security Group, subnet, endpoint, port 5432 và biến môi trường. |
| API Gateway trả lỗi 503 | Trung bình | Kiểm tra VPC Link, ALB listener, Target Group và health check. |
| SES không gửi mail | Trung bình | Verify email, kiểm tra SES sandbox, spam folder và log backend. |
| CloudFront cache file cũ | Thấp | Tạo invalidation sau khi upload frontend mới. |
| Chi phí vượt dự kiến | Trung bình | Đặt AWS Budget và xóa tài nguyên không sử dụng. |
| Request xấu hoặc bot | Trung bình | Gắn WAF với CloudFront và bật AWS Managed Rules. |



---

### 10. Kết quả mong đợi

Sau workshop, người tham gia có thể hiểu được cách triển khai một ứng dụng web thực tế trên AWS theo mô hình có frontend, backend, database và automation.

- Frontend truy cập được thông qua CloudFront.
- Backend Node.js chạy ổn định trên EC2 trong private subnet.
- RDS PostgreSQL hoạt động và chỉ cho phép backend truy cập.
- API Gateway kết nối được với backend thông qua VPC Link và Internal ALB.
- SES gửi được email nhắc deadline.
- Lambda và EventBridge tự động kiểm tra deadline theo lịch.
- WAF được cấu hình để tăng khả năng bảo vệ ứng dụng.

---

### 11. Kịch bản demo workshop

1. Truy cập ứng dụng Team Task Management thông qua CloudFront.
2. Đăng nhập bằng tài khoản manager hoặc member.
3. Manager tạo task mới và gán cho một member.
4. Member cập nhật trạng thái task trên Kanban board.
5. Kiểm tra dữ liệu task đã được lưu vào RDS PostgreSQL.
6. Gọi thủ công API deadline-check để test luồng gửi email.
7. Kiểm tra email nhắc deadline trong Gmail hoặc giao diện SES inbox mô phỏng.
8. Trigger Lambda hoặc EventBridge để chứng minh luồng tự động.
9. Giải thích WAF bảo vệ request đi qua CloudFront như thế nào.

---

### 12. Kết luận

Thông qua project này, nhóm đã xây dựng được một hệ thống quản lý công việc triển khai trên AWS với đầy đủ các thành phần quan trọng của một ứng dụng cloud: frontend hosting, backend private, database, API gateway, gửi email tự động, scheduled job và bảo mật bằng WAF.

Project không chỉ tập trung vào việc chạy được ứng dụng, mà còn giúp hiểu rõ vì sao cần chia subnet, vì sao backend nên đặt trong private subnet, vì sao cần API Gateway và VPC Link, cũng như cách các dịch vụ AWS phối hợp với nhau để tạo thành một hệ thống hoàn chỉnh.

Trong tương lai, hệ thống có thể mở rộng thêm các tính năng như đăng ký tài khoản thật, phân quyền nâng cao, dashboard thống kê, backup dữ liệu, monitoring bằng CloudWatch hoặc triển khai Multi-AZ khi cần độ sẵn sàng cao hơn.