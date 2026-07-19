---
title: "Từ Multi-AZ sang Single-AZ – Điều mình học được khi cố gắng tối ưu chi phí trên AWS"
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.3. </b> "
---
Trong quá trình thực hiện đồ án **Team Task Management** trên AWS, mình có một trải nghiệm khá thú vị về việc tối ưu chi phí.

Lúc mới bắt đầu học AWS, mình thường nghĩ rằng cứ sử dụng càng nhiều dịch vụ, kiến trúc càng giống Production thì càng "chuẩn". Vì vậy, mình thiết kế hệ thống theo hướng Multi-AZ, bao gồm nhiều subnet, EC2, RDS và các thành phần để tăng tính sẵn sàng.

Sau khi bắt đầu triển khai và tìm hiểu kỹ hơn về cách AWS tính phí, mình nhận ra rằng một số quyết định của mình chưa thực sự phù hợp với quy mô của dự án.

### Khi mới học AWS, mình khá "tham"

Kiến trúc ban đầu của mình được thiết kế với mục tiêu giống môi trường Production:

* Multi-AZ
* Nhiều Public và Private Subnet
* ALB
* API Gateway
* RDS Multi-AZ
* NAT Gateway
* EventBridge
* Lambda
* SES

Lúc đó mình chỉ nghĩ đơn giản rằng kiến trúc càng đầy đủ thì càng tốt, mà chưa để ý nhiều đến chi phí.

Đến khi bắt đầu xem AWS Pricing Calculator và theo dõi Billing Dashboard, mình mới nhận ra có những dịch vụ dù không sử dụng nhiều vẫn tính phí theo giờ. Đặc biệt là **NAT Gateway** và **RDS Multi-AZ**. Đó là lúc mình bắt đầu xem lại toàn bộ kiến trúc của nhóm.

### Điều đầu tiên mình thay đổi là bỏ Multi-AZ

Sau khi đọc tài liệu AWS và tham khảo nhiều bài chia sẻ của cộng đồng, mình hiểu rằng Multi-AZ rất phù hợp cho môi trường Production, nơi hệ thống cần hoạt động liên tục ngay cả khi một Availability Zone gặp sự cố.

Nhưng với dự án của mình thì khác. Đây chỉ là một ứng dụng phục vụ học tập và demo:

* Số lượng người dùng ít
* Dữ liệu không quá lớn
* Không yêu cầu uptime 99.99%

Vì vậy mình quyết định chuyển sang **Single-AZ**. Lúc đầu mình cũng hơi lo liệu điều này có bị xem là "không đúng chuẩn" hay không. Nhưng sau đó mình nhận ra rằng kiến trúc tốt không phải là kiến trúc sử dụng nhiều dịch vụ nhất, mà là kiến trúc phù hợp với nhu cầu thực tế.

Đối với đồ án, Single-AZ giúp tiết kiệm đáng kể chi phí trong khi toàn bộ chức năng của hệ thống vẫn hoạt động bình thường.

### Frontend không nhất thiết phải chạy trên EC2

Một điều nữa mình học được là frontend tĩnh không cần phải chạy trên EC2. Ban đầu mình từng nghĩ sẽ để cả frontend và backend trên EC2 cho đơn giản. Sau khi tìm hiểu, mình chuyển frontend sang **Amazon S3** và kết hợp với **CloudFront**. Theo cảm nhận của mình thì đây là một thay đổi rất đáng giá.

Mình không còn phải quản lý thêm một máy chủ chỉ để phục vụ HTML, CSS và JavaScript, đồng thời website cũng tải nhanh hơn nhờ CloudFront cache nội dung ở các Edge Location.

### Lambda giúp mình bỏ được Cron Job trên EC2

Một chức năng của dự án là gửi email nhắc deadline. Lúc đầu mình định viết một tiến trình chạy liên tục trên EC2 để kiểm tra deadline. Sau đó mình biết đến **Amazon EventBridge** và **AWS Lambda**.

Mình thay đổi luồng xử lý thành:
`EventBridge chạy theo lịch` → `Lambda kiểm tra dữ liệu trong RDS` → `Amazon SES gửi email`

Điều mình thích ở cách làm này là Lambda chỉ chạy khi có công việc cần xử lý rồi tự dừng, thay vì phải để một tiến trình chạy 24/7 trên EC2. Đối với một tác vụ chỉ chạy vài lần mỗi ngày thì cách này vừa đơn giản vừa tiết kiệm hơn.

### NAT Gateway là dịch vụ khiến mình chú ý nhiều nhất

Trong quá trình triển khai, mình khá bất ngờ khi biết NAT Gateway được tính phí ngay cả khi lưu lượng sử dụng không nhiều. Đây cũng là lúc mình bắt đầu tập thói quen:

* Tạo khi cần
* Xóa khi không còn sử dụng
* Kiểm tra Billing Dashboard thường xuyên

Có lẽ đây là bài học mình nhớ nhất trong quá trình học AWS.

### Điều mình rút ra

Sau khi hoàn thành dự án, mình nhận ra rằng việc tối ưu chi phí không chỉ là giảm số tiền phải trả. Quan trọng hơn là hiểu **vì sao mình chọn dịch vụ đó**. Ví dụ:

* Mình không bỏ Multi-AZ vì nó "không tốt", mà vì quy mô dự án chưa cần đến.
* Mình chọn S3 thay cho EC2 vì frontend là nội dung tĩnh.
* Mình dùng Lambda cho tác vụ theo lịch vì không cần một server chạy liên tục.
* Mình theo dõi các tài nguyên đang hoạt động để tránh phát sinh chi phí ngoài ý muốn.

Có thể cách tối ưu của mình vẫn chưa phải là tốt nhất, nhưng trong quá trình học AWS, mình thấy đây là những kinh nghiệm thực tế giúp mình hiểu nền tảng này nhiều hơn, thay vì chỉ làm theo tài liệu từng bước.

### Kết luận

Mình vẫn còn khá mới với AWS nên chắc chắn còn nhiều điều phải học. Tuy nhiên, sau khi tự triển khai một dự án hoàn chỉnh, mình nhận thấy rằng tối ưu chi phí không phải là cắt giảm thật nhiều dịch vụ, mà là **lựa chọn kiến trúc phù hợp với mục tiêu của hệ thống**.

![Kiến trúc giải pháp tối ưu Single-AZ](/images/3-BlogsPosted/3.3-Blog3/page_3_img_1.png)