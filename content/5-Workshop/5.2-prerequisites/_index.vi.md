---
title: "Điều kiện tiên quyết"
date: 2026-07-20
weight: 2
pre: " <b> 5.2. </b> "
chapter: false
---

Chuẩn bị AWS Account, GitHub, Git, Node.js, npm, AWS CLI, PostgreSQL client, quyền IAM cần thiết và email SES đã verify. Đặt region `ap-southeast-1`.

## Quyền IAM

Trong môi trường thực hành, tài khoản được thêm vào nhóm **Project-Developers**. Ảnh dưới đây ghi nhận hai policy đang được gắn với nhóm tại thời điểm triển khai: **AdministratorAccess** và customer-managed policy **testpolicy**.

<figure style="margin: 1rem auto; max-width: 900px; text-align: center;">
  <img src="/images/5-Workshop/5.2-prerequisites/iam-project-developers-permissions.png"
       alt="Các policy được gắn với IAM user group Project-Developers"
       loading="lazy"
       style="display: block; width: 100%; height: auto; border-radius: 6px;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Hình 1: Các policy được gắn với nhóm IAM Project-Developers trong môi trường thực hành.
  </figcaption>
</figure>


## Xác minh

Sử dụng AWS CLI để kiểm tra Region đang cấu hình và xác nhận thông tin định danh của principal hiện tại:

<figure style="margin: 1rem auto; max-width: 760px; text-align: center;">
  <img src="/images/5-Workshop/5.2-prerequisites/aws-account-region-verification.png"
       alt="Kiểm tra AWS Region và caller identity"
       loading="lazy"
       style="display: block; width: 100%; height: auto; border-radius: 6px;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Hình 2: Kiểm tra cấu hình Region và xác nhận AWS caller identity.
  </figcaption>
</figure>

Kiểm tra phiên bản các công cụ cần thiết trên máy triển khai:

<figure style="margin: 1rem auto; max-width: 760px; text-align: center;">
  <img src="/images/5-Workshop/5.2-prerequisites/local-tool-versions.png"
       alt="Kiểm tra phiên bản Node.js, PostgreSQL client, npm, Git và AWS CLI"
       loading="lazy"
       style="display: block; width: 100%; height: auto; border-radius: 6px;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Hình 3: Kiểm tra phiên bản các công cụ trên máy triển khai.
  </figcaption>
</figure>

Kết quả ghi nhận:

- Node.js: **v24.18.0**
- PostgreSQL client (psql): **15.18**
- npm: **11.16.0**
- Git: **2.50.1**
- AWS CLI: **2.33.15**

## Xác minh email Amazon SES

Hai email identity sử dụng cho chức năng gửi email của dự án đã được xác minh trong Amazon SES tại Region **Asia Pacific (Singapore)**.

<figure style="margin: 1rem auto; max-width: 900px; text-align: center;">
  <img src="/images/5-Workshop/5.2-prerequisites/ses-verified-email-identities.png"
       alt="Hai email identity có trạng thái Verified trong Amazon SES"
       loading="lazy"
       style="display: block; width: 100%; height: auto; border-radius: 6px;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Hình 4: Các email identity đã được xác minh trong Amazon SES.
  </figcaption>
</figure>
