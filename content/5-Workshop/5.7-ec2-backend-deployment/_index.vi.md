---
title: "Triển khai backend EC2"
date: 2026-07-20
weight: 7
pre: " <b> 5.7. </b> "
chapter: false
---

Khởi tạo Amazon Linux 2023 `t3.micro` trong private app subnet với IAM Role cho Session Manager. Cài Node.js/Git, cấu hình biến môi trường, tạo systemd service và kiểm tra health endpoint cục bộ.

```bash
sudo systemctl daemon-reload
sudo systemctl enable teamtask
sudo systemctl start teamtask
sudo systemctl status teamtask
curl http://localhost:3000/health
```

```bash
sudo journalctl -u teamtask.service -n 100
```
## IAM Role và khởi tạo EC2

1. Tạo IAM Role trusted entity EC2, thêm quyền cần cho Systems Manager và tích hợp của ứng dụng. Tránh policy Administrator quá rộng.
2. Đặt tên, tạo role và gắn role làm EC2 instance profile.
3. Khởi tạo backend trong private app subnet, không cấp public IPv4.
4. Kết nối qua Session Manager, deploy backend, bật systemd service và test `localhost:3000`.

![Tạo IAM Role cho EC2](/images/5-Workshop/teamtask-deployment/step-16.png)

![Thêm quyền cho IAM Role](/images/5-Workshop/teamtask-deployment/step-17.png)

![Đặt tên và tạo IAM Role](/images/5-Workshop/teamtask-deployment/step-18.png)

![Khởi tạo EC2 backend](/images/5-Workshop/teamtask-deployment/step-20.png)

