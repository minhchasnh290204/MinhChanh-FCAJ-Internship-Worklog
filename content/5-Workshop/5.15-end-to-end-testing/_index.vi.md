---
title: "Kiểm thử End-to-End"
date: 2026-07-20
weight: 15
pre: " <b> 5.15. </b> "
chapter: false
---

Mục này tổng hợp quá trình kiểm thử và xác minh hệ thống **Team Task Management** sau khi triển khai. Phạm vi kiểm tra bao gồm giao diện người dùng, kết nối Backend API, luồng tạo và giao công việc, Lambda kiểm tra deadline, email Amazon SES và cấu hình bảo vệ CloudFront bằng AWS WAF. Kết quả được đối chiếu với các ảnh ghi nhận trong quá trình thực hiện workshop.

## Kết quả kiểm thử

Quá trình kiểm tra xác nhận giao diện đã kết nối được với Backend API; Manager có thể tạo và giao công việc, còn Member có thể đăng nhập và xem công việc được giao. Luồng kiểm tra deadline cũng hoạt động từ API, Lambda và CloudWatch đến email nhắc hạn được gửi qua Amazon SES. Trên lớp bảo vệ biên, AWS WAF đã được kích hoạt cho CloudFront với giới hạn tốc độ và tính năng bảo vệ SQL injection.

Các ảnh dưới đây ghi lại kết quả của từng phần trong luồng kiểm thử.

## Minh chứng luồng ứng dụng

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;align-items:start;">
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-28.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-28.png" alt="Trang đăng nhập Team Task Management đã triển khai" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 1. Trang đăng nhập được tải từ endpoint đã triển khai.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-33.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-33.png" alt="Manager tạo và giao công việc cho Member" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 2. Manager nhập thông tin và chọn Member nhận việc.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-34.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-34.png" alt="Công việc xuất hiện trên Kanban của Manager" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 3. Công việc đã tạo xuất hiện trên Kanban của Manager.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-35.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-35.png" alt="Member xem công việc được giao" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 4. Member đăng nhập và xem đúng công việc được giao.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-36.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-36.png" alt="Biểu mẫu cập nhật trạng thái công việc" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 5. Biểu mẫu cho phép Member chọn trạng thái và lưu thay đổi.</em></figcaption>
  </figure>
</div>

## Minh chứng API, Lambda và email

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;align-items:start;">
  <figure style="margin:0;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/lambda-test-execution.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/lambda-test-execution.png" alt="Lambda test thành công và API trả về HTTP 200" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 6. Lambda chạy thành công và nhận phản hồi API HTTP 200.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/lambda-cloudwatch-invocations.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/lambda-cloudwatch-invocations.png" alt="Các lượt gọi Lambda trên CloudWatch" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 7. CloudWatch ghi nhận các lượt gọi Lambda.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-42.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-42.png" alt="Cấu hình EventBridge Scheduler gọi Lambda mỗi ngày" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 8. EventBridge Scheduler được cấu hình chạy mỗi ngày và gọi Lambda.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-45.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-45.png" alt="Email nhắc deadline được nhận trong Gmail" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 9. Email nhắc hạn từ Amazon SES được nhận trong Gmail.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-46.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-46.png" alt="Cấu hình AWS WAF cho CloudFront" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Hình 10. AWS WAF được kích hoạt cho CloudFront với giới hạn tốc độ và tính năng bảo vệ SQL injection.</em></figcaption>
  </figure>
</div>
