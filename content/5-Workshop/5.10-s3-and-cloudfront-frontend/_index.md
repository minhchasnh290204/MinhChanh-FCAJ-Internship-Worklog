---
title: "S3 and CloudFront Frontend"
date: 2026-07-20
weight: 10
pre: " <b> 5.10. </b> "
chapter: false
---

Create a private S3 origin and CloudFront distribution. Serve static files with the default behavior and route `/api/*` to API Gateway; redirect HTTP to HTTPS, set `API_BASE=/api`, deploy files, and invalidate the cache. Prefer Origin Access Control for the S3 origin.

```bash
aws s3 sync ./frontend s3://teamtask-frontend-thuan-2026
aws cloudfront create-invalidation \
  --distribution-id E1AQK1RM1KF43D \
  --paths "/*"
```

> Confirm that the bucket and distribution IDs belong to the intended account before running these commands.
## Frontend deployment

1. Create the frontend S3 bucket and upload the built static files.
2. The source deployment enabled S3 Static Website Hosting. For the final secure architecture, prefer a private S3 REST origin with CloudFront Origin Access Control; do not leave the bucket publicly readable unless explicitly required.
3. Confirm the Manager and Member interfaces can call the deployed API.
4. Create CloudFront, configure the frontend origin and `/api/*` behavior, redirect viewers to HTTPS, then invalidate the cache after updates.

![Create the frontend S3 bucket](/images/5-Workshop/teamtask-deployment/step-29.png)

![S3 bucket configuration](/images/5-Workshop/teamtask-deployment/step-30.png)

![Static website hosting](/images/5-Workshop/teamtask-deployment/step-31.png)

![Upload frontend files](/images/5-Workshop/teamtask-deployment/step-32.png)

![Manager interface after deployment](/images/5-Workshop/teamtask-deployment/step-33.png)

![Frontend and backend integration](/images/5-Workshop/teamtask-deployment/step-34.png)

![Member interface](/images/5-Workshop/teamtask-deployment/step-35.png)

![Member task view](/images/5-Workshop/teamtask-deployment/step-36.png)

![Create CloudFront distribution](/images/5-Workshop/teamtask-deployment/step-37.png)

![CloudFront configuration](/images/5-Workshop/teamtask-deployment/step-38.png)

