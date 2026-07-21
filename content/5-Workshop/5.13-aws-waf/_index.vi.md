---
title: "AWS WAF"
date: 2026-07-20
weight: 13
pre: " <b> 5.13. </b> "
chapter: false
---

Gắn Web ACL với CloudFront. Đánh giá AWS Managed Rules gồm Common Rule Set, Known Bad Inputs, IP Reputation, sau đó thêm rate-based rule. Có thể bắt đầu bằng Count mode và test request allow/block.

## Triển khai Web ACL

1. Tạo Web ACL scope CloudFront trong đúng ngữ cảnh scope/region của WAF.
2. Thêm managed rule group phù hợp và rate-based rule; bắt đầu Count mode nếu chưa chắc tác động.
3. Associate Web ACL với CloudFront distribution.
4. Gửi request bình thường/bất thường và kiểm tra kết quả allow, count hoặc block trong WAF metrics.

![Gắn AWS WAF với CloudFront](/images/5-Workshop/teamtask-deployment/step-46.png)


