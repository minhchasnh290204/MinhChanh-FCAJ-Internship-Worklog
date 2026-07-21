---
title: "From Multi-AZ to Single-AZ – What I Learned While Trying to Optimize Costs on AWS"
date: 2024-01-01
weight: 3
chapter: false
pre: " <b> 3.3. </b> "
---
While working on the **Team Task Management** project on AWS, I had a rather interesting experience with cost optimization.

When I first started learning AWS, I often thought that using more services and making the architecture more like Production was "more correct." So I designed the system with Multi-AZ, including multiple subnets, EC2, RDS, and components to increase availability.

After starting deployment and learning more about how AWS charges, I realized that some of my decisions were not really suitable for the project scale.

### When I first learned AWS, I was quite "greedy"

My initial architecture was designed with Production-like goals:

* Multi-AZ
* Multiple Public and Private Subnets
* ALB
* API Gateway
* RDS Multi-AZ
* NAT Gateway
* EventBridge
* Lambda
* SES

At that time I simply thought the more complete the architecture, the better, without paying much attention to cost.

When I started looking at the AWS Pricing Calculator and monitoring the Billing Dashboard, I realized that some services charge by the hour even when not used much. Especially **NAT Gateway** and **RDS Multi-AZ**. That's when I started reviewing the entire team architecture.

### The first thing I changed was removing Multi-AZ

After reading AWS documentation and referencing many community posts, I understood that Multi-AZ is very suitable for Production environments where systems need to run continuously even when an Availability Zone has issues.

But my project was different. This is just an application for learning and demo:

* Few users
* Data not too large
* No 99.99% uptime requirement

So I decided to switch to **Single-AZ**. At first I was a bit worried whether this would be seen as "not standard." But then I realized that good architecture is not the one using the most services, but the one suitable for actual needs.

For the project, Single-AZ significantly saves costs while all system functions still work normally.

### Frontend doesn't necessarily need to run on EC2

Another thing I learned is that static frontend doesn't need to run on EC2. Initially I thought I would put both frontend and backend on EC2 for simplicity. After researching, I moved the frontend to **Amazon S3** combined with **CloudFront**. In my experience this was a very worthwhile change.

I no longer need to manage an additional server just to serve HTML, CSS, and JavaScript, and the website also loads faster thanks to CloudFront caching content at Edge Locations.

### Lambda helped me remove Cron Jobs on EC2

One feature of the project is sending deadline reminder emails. At first I planned to write a process running continuously on EC2 to check deadlines. Then I learned about **Amazon EventBridge** and **AWS Lambda**.

I changed the processing flow to:
EventBridge runs on schedule → Lambda checks data in RDS → Amazon SES sends email

What I like about this approach is Lambda only runs when there's work to process then stops automatically, instead of keeping a process running 24/7 on EC2. For a task that only runs a few times a day, this is both simpler and more economical.

### NAT Gateway is the service that surprised me the most

During deployment, I was quite surprised to learn that NAT Gateway is charged even when traffic usage is not high. This is also when I started building habits:

* Create when needed
* Delete when no longer used
* Check Billing Dashboard regularly

Perhaps this is the lesson I remember most while learning AWS.

### What I took away

After completing the project, I realized that cost optimization is not just about reducing the amount to pay. More importantly, it's understanding **why you choose that service**. For example:

* I didn't remove Multi-AZ because it's "not good," but because the project scale didn't need it yet.
* I chose S3 over EC2 because the frontend is static content.
* I used Lambda for scheduled tasks because a continuously running server isn't needed.
* I monitored active resources to avoid unexpected costs.

My optimization approach may not be the best yet, but while learning AWS, I found these practical experiences helped me understand the platform better, rather than just following step-by-step documentation.

### Conclusion

I'm still quite new to AWS so there's certainly much more to learn. However, after deploying a complete project myself, I see that cost optimization is not about cutting many services, but about **choosing architecture suitable for system goals**.

![Optimized Single-AZ solution architecture](/images/3-BlogsPosted/3.3-Blog3/page_3_img_1.png)