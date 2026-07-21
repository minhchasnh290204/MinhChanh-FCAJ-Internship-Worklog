---
title: "Frontend S3 và CloudFront"
date: 2026-07-20
weight: 10
pre: " <b> 5.10. </b> "
chapter: false
---

Tạo S3 origin private và CloudFront distribution. Dùng default behavior cho file tĩnh và `/api/*` đến API Gateway; redirect HTTP sang HTTPS, đặt `API_BASE=/api`, deploy file và invalidate cache. Ưu tiên Origin Access Control cho S3 origin.

```bash
aws s3 sync ./frontend s3://teamtask-frontend-thuan-2026
aws cloudfront create-invalidation \
  --distribution-id E1AQK1RM1KF43D \
  --paths "/*"
```

> Confirm that the bucket and distribution IDs belong to the intended account before running these commands.
## Triển khai frontend

1. Tạo S3 bucket frontend và upload các file static đã build.
2. Quy trình nguồn bật S3 Static Website Hosting. Với kiến trúc cuối an toàn hơn, ưu tiên S3 REST origin private cùng CloudFront Origin Access Control; không để bucket public nếu không thật sự cần.
3. Xác nhận giao diện Manager và Member gọi được API đã deploy.
4. Tạo CloudFront, cấu hình frontend origin và behavior `/api/*`, redirect viewer sang HTTPS, rồi invalidate cache sau cập nhật.

![Tạo S3 bucket frontend](/images/5-Workshop/teamtask-deployment/step-29.png)

![Cấu hình S3 bucket](/images/5-Workshop/teamtask-deployment/step-30.png)

![Static Website Hosting](/images/5-Workshop/teamtask-deployment/step-31.png)

![Upload file frontend](/images/5-Workshop/teamtask-deployment/step-32.png)

![Giao diện Manager sau deploy](/images/5-Workshop/teamtask-deployment/step-33.png)

![Tích hợp frontend và backend](/images/5-Workshop/teamtask-deployment/step-34.png)

![Giao diện Member](/images/5-Workshop/teamtask-deployment/step-35.png)

![Màn hình task của Member](/images/5-Workshop/teamtask-deployment/step-36.png)

![Tạo CloudFront distribution](/images/5-Workshop/teamtask-deployment/step-37.png)

![Cấu hình CloudFront](/images/5-Workshop/teamtask-deployment/step-38.png)

