---
title: "Logging và Monitoring"
date: 2026-07-20
weight: 14
pre: " <b> 5.14. </b> "
chapter: false
---

Mục này ghi lại cách kiểm tra Lambda/API logs, cấu hình health check của Target Group và các hạng mục cần tiếp tục theo dõi như EC2 CPU, RDS connections, systemd logs và CloudWatch alarms.

## Lambda execution và CloudWatch Logs

Ảnh chạy thử Lambda cho thấy trạng thái **Succeeded**, response trả về **statusCode 200**, quét 3 task và gửi 3 email. Phần Function Logs cũng ghi nhận request đã hoàn thành.

CloudWatch Logs hiển thị các invocation gần đây cùng Request ID, LogStream, Duration, Billed Duration và mức sử dụng bộ nhớ. Đây là dữ liệu dùng để đối chiếu lỗi, thời gian thực thi và mức sử dụng tài nguyên của Lambda.

<div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: center; gap: 1.25rem; margin: 1rem auto;">
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/lambda-test-execution.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/lambda-test-execution.png"
           alt="Kết quả chạy thử Lambda thành công"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Hình 1: Lambda chạy thành công và trả về statusCode 200.
    </figcaption>
  </figure>
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/lambda-cloudwatch-invocations.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/lambda-cloudwatch-invocations.png"
           alt="Các invocation gần đây của Lambda trong CloudWatch Logs"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Hình 2: Các invocation gần đây và thông tin duration, memory trong CloudWatch Logs.
    </figcaption>
  </figure>
</div>

## Target Group và health check

Target Group được cấu hình với target type **Instances**, giao thức **HTTP** và backend port **3000**. Health check sử dụng giao thức HTTP, path **/**, traffic port và healthy threshold bằng 4.

<div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: center; gap: 1.25rem; margin: 1rem auto;">
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/teamtask-deployment/step-21.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-21.png"
           alt="Cấu hình Target Group cho EC2 backend port 3000"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Hình 3: Cấu hình Target Group HTTP port 3000 cho EC2 backend.
    </figcaption>
  </figure>
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/teamtask-deployment/step-22.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-22.png"
           alt="Cấu hình health check của Target Group"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Hình 4: Cấu hình HTTP health check path / và healthy threshold.
    </figcaption>
  </figure>
</div>

Ảnh trạng thái Target Group cho thấy có **1 target Healthy** và **0 target Unhealthy**. Backend EC2 được đăng ký trên port 3000 và sẵn sàng nhận request tại thời điểm chụp.

<figure style="margin: 1rem auto; max-width: 900px; text-align: center;">
  <a href="/images/5-Workshop/5.14-logging-and-monitoring/target-group-healthy.png" target="_blank" rel="noopener">
    <img src="/images/5-Workshop/5.14-logging-and-monitoring/target-group-healthy.png"
         alt="Target Group có một target Healthy"
         loading="lazy"
         style="display: block; width: 100%; height: auto; max-height: 460px; object-fit: contain; border-radius: 6px;">
  </a>
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Hình 5: Target Group ghi nhận 1 target Healthy và 0 target Unhealthy.
  </figcaption>
</figure>

## Theo dõi EC2 và RDS

Tab Monitoring của EC2 hiển thị CPU utilization, lưu lượng mạng, số lượng packet và CPU credit. Dashboard CloudWatch của RDS hiển thị CPUUtilization, DatabaseConnections, FreeableMemory, FreeStorageSpace, latency, throughput và IOPS.

<div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: center; gap: 1.25rem; margin: 1rem auto;">
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/ec2-cloudwatch-metrics.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/ec2-cloudwatch-metrics.png"
           alt="Các metric giám sát của EC2"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Hình 6: Các metric CPU, network và CPU credit của EC2.
    </figcaption>
  </figure>
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/rds-cloudwatch-metrics.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/rds-cloudwatch-metrics.png"
           alt="Các metric giám sát của RDS PostgreSQL"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Hình 7: Dashboard CloudWatch của RDS PostgreSQL.
    </figcaption>
  </figure>
</div>

## Trạng thái backend và systemd logs

Kết quả systemctl cho thấy backend service ở trạng thái **active (running)**. Recent logs ghi nhận hoạt động đăng nhập, deadline scan và kết quả gửi email qua SES, bao gồm cả lần gửi thất bại do email chưa được verify và các lần gửi thành công sau đó.

<figure style="margin: 1rem auto; max-width: 1000px; text-align: center;">
  <a href="/images/5-Workshop/5.14-logging-and-monitoring/backend-systemd-logs.png" target="_blank" rel="noopener">
    <img src="/images/5-Workshop/5.14-logging-and-monitoring/backend-systemd-logs.png"
         alt="Trạng thái systemd và recent logs của backend service"
         loading="lazy"
         style="display: block; width: 100%; height: auto; max-height: 500px; object-fit: contain; border-radius: 6px;">
  </a>
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Hình 8: Backend service active và các log gần nhất từ systemd.
  </figcaption>
</figure>

## Checklist theo dõi vận hành

| Hạng mục | Cách kiểm tra | Minh chứng hiện có |
| --- | --- | --- |
| Lambda/API logs | Lambda execution result và CloudWatch Logs | Hình 1–2 |
| Target Group | Health-check configuration và tab Targets | Hình 3–5 |
| EC2 metrics | Tab Monitoring và CloudWatch metrics | Hình 6 |
| RDS metrics | CloudWatch database monitoring | Hình 7 |
| Backend service | systemd status và recent logs | Hình 8 |
