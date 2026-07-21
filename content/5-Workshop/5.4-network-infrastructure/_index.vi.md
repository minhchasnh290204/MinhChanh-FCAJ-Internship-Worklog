---
title: "Hạ tầng mạng"
date: 2026-07-20
weight: 4
pre: " <b> 5.4. </b> "
chapter: false
---

Tạo VPC `10.0.0.0/16`, public subnet `10.0.1.0/24`, private app `10.0.11.0/24`, private DB `10.0.12.0/24`, Internet Gateway, NAT Gateway và route table. RDS thường yêu cầu DB subnet group trải trên ít nhất hai Availability Zone; bổ sung private DB subnet thứ hai với CIDR không trùng trước khi tạo RDS.

## Quy trình và minh chứng triển khai

1. Tạo VPC của dự án và kiểm tra IPv4 CIDR.
2. Tạo public subnet, private app subnet và private DB subnet. Đặt các DB subnet ở Availability Zone khác nhau khi tạo RDS DB subnet group.
3. Tạo và gắn Internet Gateway.
4. Tạo public route table, thêm `0.0.0.0/0` qua Internet Gateway và associate public subnet.
5. Cấp Elastic IP và tạo NAT Gateway trong public subnet.
6. Tạo private route table và định tuyến outbound qua NAT Gateway.

![Tạo VPC](/images/5-Workshop/teamtask-deployment/step-01.png)

![Public subnet](/images/5-Workshop/teamtask-deployment/step-02.png)

![Private subnet ứng dụng](/images/5-Workshop/teamtask-deployment/step-03.png)

![Private subnet database](/images/5-Workshop/teamtask-deployment/step-04.png)

![Cấu hình subnet database](/images/5-Workshop/teamtask-deployment/step-05.png)

![Tạo Internet Gateway](/images/5-Workshop/teamtask-deployment/step-06.png)

![Gắn Internet Gateway](/images/5-Workshop/teamtask-deployment/step-07.png)

![Public route table](/images/5-Workshop/teamtask-deployment/step-08.png)

![Route mặc định ra Internet](/images/5-Workshop/teamtask-deployment/step-09.png)

![Associate public subnet](/images/5-Workshop/teamtask-deployment/step-10.png)

![NAT Gateway](/images/5-Workshop/teamtask-deployment/step-11.png)

![Private route table](/images/5-Workshop/teamtask-deployment/step-12.png)

![Route private qua NAT](/images/5-Workshop/teamtask-deployment/step-13.png)

## Xác minh

> Bổ sung ảnh đã che thông tin nhạy cảm và kết quả quan sát sau khi hoàn thành chương này.
