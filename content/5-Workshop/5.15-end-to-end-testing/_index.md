---
title: "End-to-End Testing"
date: 2026-07-20
weight: 15
pre: " <b> 5.15. </b> "
chapter: false
---

This section consolidates the post-deployment testing and verification of **Team Task Management**. The scope covers the user interface, Backend API connectivity, task creation and assignment, the deadline-check Lambda, Amazon SES email delivery, and AWS WAF protection for CloudFront. Each result is based on screenshots captured while completing the workshop.

## Test results

Testing confirmed that the interface connects to the Backend API; a Manager can create and assign tasks, while a Member can sign in and view assigned work. The deadline-reminder flow also operates from the API, Lambda, and CloudWatch through email delivery by Amazon SES. At the edge-security layer, AWS WAF is enabled for CloudFront with rate limiting and SQL injection protection.

The screenshots below record the results of each part of the test flow.

## Application-flow evidence

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;align-items:start;">
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-28.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-28.png" alt="Deployed Team Task Management login page" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 1. The login page loads from the deployed endpoint.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-33.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-33.png" alt="Manager creates and assigns a task" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 2. The Manager enters task details and selects a Member.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-34.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-34.png" alt="Created task on the Manager Kanban board" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 3. The created task appears on the Manager's Kanban board.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-35.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-35.png" alt="Member views the assigned task" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 4. The Member signs in and sees the assigned task.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-36.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-36.png" alt="Task status update form" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 5. The task form allows the Member to select a status and save changes.</em></figcaption>
  </figure>
</div>

## API, Lambda, and email evidence

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;align-items:start;">
  <figure style="margin:0;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/lambda-test-execution.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/lambda-test-execution.png" alt="Successful Lambda test and HTTP 200 API response" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 6. Lambda succeeds and receives an HTTP 200 API response.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/lambda-cloudwatch-invocations.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/lambda-cloudwatch-invocations.png" alt="Lambda invocations in CloudWatch" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 7. CloudWatch records recent Lambda invocations.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-42.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-42.png" alt="EventBridge Scheduler configured to invoke Lambda daily" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 8. EventBridge Scheduler is configured to invoke Lambda every day.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-45.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-45.png" alt="Deadline reminder received in Gmail" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 9. The Amazon SES deadline reminder is received in Gmail.</em></figcaption>
  </figure>
  <figure style="margin:0;">
    <a href="/images/5-Workshop/teamtask-deployment/step-46.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-46.png" alt="AWS WAF protection settings for CloudFront" loading="lazy" style="width:100%;height:260px;object-fit:contain;border:1px solid #ddd;border-radius:6px;">
    </a>
    <figcaption><em>Figure 10. AWS WAF is enabled for CloudFront with rate limiting and SQL injection protection.</em></figcaption>
  </figure>
</div>
