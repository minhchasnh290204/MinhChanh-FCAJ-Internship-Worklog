---
title: "Chuẩn bị mã nguồn"
date: 2026-07-20
weight: 3
pre: " <b> 5.3. </b> "
chapter: false
---

Trước khi triển khai lên AWS, mã nguồn cần được tổ chức rõ ràng để tách phần frontend, backend, cấu hình triển khai và tài liệu. Cấu trúc này giúp các thành viên dễ tìm kiếm file, cài đặt dependency và thực hiện từng bước triển khai mà không làm lẫn mã ứng dụng với thông tin nhạy cảm.

## Cấu trúc dự án

Dựa trên workspace thực tế, mã nguồn Team Task Management được tách thành các thư mục frontend, backend, triển khai và tài liệu như trong ảnh dưới đây.

<figure style="max-width:420px;margin:20px auto;text-align:center;">
  <a href="/images/5-Workshop/5.3-source-code-preparation/source-code-structure.png" target="_blank" rel="noopener">
    <img src="/images/5-Workshop/5.3-source-code-preparation/source-code-structure.png"
         alt="Cấu trúc mã nguồn Team Task Management trong Visual Studio Code"
         loading="lazy"
         style="width:100%;height:auto;border:1px solid #ddd;border-radius:6px;">
  </a>
  <figcaption><em>Hình 1. Cấu trúc thư mục mã nguồn thực tế của Team Task Management trong Visual Studio Code.</em></figcaption>
</figure>

Vai trò của các thành phần chính:

| Thành phần | Chức năng |
|---|---|
| `backend/` | Chứa backend Node.js, API quản lý task, kết nối PostgreSQL và logic kiểm tra deadline |
| `frontend/` | Chứa giao diện đăng nhập, màn hình Manager, Member và các file tĩnh được triển khai lên S3 |
| `deploy/` | Chứa cấu hình hoặc script hỗ trợ triển khai ứng dụng và dịch vụ AWS |
| `docs/` | Lưu tài liệu kiến trúc, hướng dẫn triển khai và nội dung tham khảo của dự án |
| `docker-compose.yml` | Hỗ trợ khởi tạo môi trường container cục bộ khi cần phát triển hoặc kiểm thử |
| `package.json` | Khai báo dependency và script Node.js của dự án |
| `package-lock.json` | Khóa phiên bản dependency để các môi trường cài đặt nhất quán |
| `.gitignore` | Loại trừ credential, dependency và file sinh ra cục bộ khỏi Git |

Thư mục `.agents/` là metadata phục vụ công cụ phát triển, không tham gia vào luồng chạy của ứng dụng. Thư mục `node_modules/` được tạo sau khi cài dependency và không nên đưa lên GitHub.

## Tải và cài đặt mã nguồn

Clone repository, chuyển vào thư mục dự án và cài dependency theo cấu hình `package.json`:

```bash
git clone <repository-url>
cd TEAM-TASK-MANAGEMENT
npm install
```

Nếu frontend và backend có `package.json` riêng, dependency cần được cài trong từng thư mục tương ứng:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Sau khi cài đặt, kiểm tra các script trong `package.json` và chạy ứng dụng cục bộ trước khi chuẩn bị file triển khai lên AWS.

## Quản lý biến môi trường

File `.env` chứa các giá trị chỉ dùng tại môi trường cục bộ, chẳng hạn database endpoint, database credential, API URL hoặc secret nội bộ. File này không được commit lên GitHub.

Repository nên cung cấp file `.env.example` chỉ chứa tên biến và giá trị mẫu không nhạy cảm:

```dotenv
DB_HOST=<database-host>
DB_PORT=5432
DB_NAME=<database-name>
DB_USER=<database-user>
DB_PASSWORD=<database-password>
INTERNAL_LAMBDA_SECRET=<secret-value>
```

Các mục cần có trong `.gitignore`:

```gitignore
.env
.env.*
node_modules/
*.log
```

Không hard-code AWS Access Key, Secret Access Key, mật khẩu RDS hoặc Lambda secret trong source code. Khi triển khai trên AWS, EC2 nên sử dụng IAM Role và các secret cần được truyền qua biến môi trường hoặc dịch vụ quản lý secret phù hợp.

## Kiểm tra trước khi triển khai

Trước khi chuyển sang bước tạo hạ tầng AWS, cần bảo đảm frontend và backend chạy được ở môi trường local, dependency được khóa phiên bản, file `.env` không bị Git theo dõi và repository không chứa credential. Cấu trúc thư mục sau khi rà soát sẽ được dùng xuyên suốt các bước triển khai từ mục 5.4 trở đi.
