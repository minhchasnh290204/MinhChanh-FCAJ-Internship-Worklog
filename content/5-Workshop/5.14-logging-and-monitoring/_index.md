---
title: "Logging and Monitoring"
date: 2026-07-20
weight: 14
pre: " <b> 5.14. </b> "
chapter: false
---

This section records how Lambda/API logs and Target Group health-check settings were reviewed, together with the remaining operational checks for EC2 CPU, RDS connections, systemd logs, and CloudWatch alarms.

## Lambda execution and CloudWatch Logs

The Lambda test result shows **Succeeded**, an HTTP **statusCode 200** response, three scanned tasks, and three emails sent. The Function Logs also record the completed request.

CloudWatch Logs lists recent invocations with Request ID, LogStream, Duration, Billed Duration, and memory usage. These fields support error investigation and review of Lambda execution time and resource consumption.

<div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: center; gap: 1.25rem; margin: 1rem auto;">
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/lambda-test-execution.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/lambda-test-execution.png"
           alt="Successful Lambda test execution"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Figure 1: Lambda completed successfully and returned statusCode 200.
    </figcaption>
  </figure>
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/lambda-cloudwatch-invocations.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/lambda-cloudwatch-invocations.png"
           alt="Recent Lambda invocations in CloudWatch Logs"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Figure 2: Recent invocations with duration and memory data in CloudWatch Logs.
    </figcaption>
  </figure>
</div>

## Target Group and health check

The Target Group uses **Instances** as its target type, **HTTP**, and backend port **3000**. Its health check uses HTTP, path **/**, the traffic port, and a healthy threshold of 4.

<div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: center; gap: 1.25rem; margin: 1rem auto;">
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/teamtask-deployment/step-21.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-21.png"
           alt="Target Group configuration for the EC2 backend on port 3000"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Figure 3: HTTP Target Group configuration on backend port 3000.
    </figcaption>
  </figure>
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/teamtask-deployment/step-22.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/teamtask-deployment/step-22.png"
           alt="Target Group health-check configuration"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Figure 4: HTTP health-check path / and healthy-threshold configuration.
    </figcaption>
  </figure>
</div>

The Target Group status screenshot shows **1 Healthy target** and **0 Unhealthy targets**. The backend EC2 instance is registered on port 3000 and was ready to receive requests at the time of capture.

<figure style="margin: 1rem auto; max-width: 900px; text-align: center;">
  <a href="/images/5-Workshop/5.14-logging-and-monitoring/target-group-healthy.png" target="_blank" rel="noopener">
    <img src="/images/5-Workshop/5.14-logging-and-monitoring/target-group-healthy.png"
         alt="Target Group with one Healthy target"
         loading="lazy"
         style="display: block; width: 100%; height: auto; max-height: 460px; object-fit: contain; border-radius: 6px;">
  </a>
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Figure 5: Target Group with 1 Healthy and 0 Unhealthy targets.
  </figcaption>
</figure>

## EC2 and RDS monitoring

The EC2 Monitoring tab shows CPU utilization, network traffic, packet counts, and CPU credits. The RDS CloudWatch dashboard shows CPUUtilization, DatabaseConnections, FreeableMemory, FreeStorageSpace, latency, throughput, and IOPS.

<div style="display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: center; gap: 1.25rem; margin: 1rem auto;">
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/ec2-cloudwatch-metrics.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/ec2-cloudwatch-metrics.png"
           alt="EC2 monitoring metrics"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Figure 6: EC2 CPU, network, and CPU-credit metrics.
    </figcaption>
  </figure>
  <figure style="flex: 1 1 580px; max-width: 760px; margin: 0; text-align: center;">
    <a href="/images/5-Workshop/5.14-logging-and-monitoring/rds-cloudwatch-metrics.png" target="_blank" rel="noopener">
      <img src="/images/5-Workshop/5.14-logging-and-monitoring/rds-cloudwatch-metrics.png"
           alt="RDS PostgreSQL monitoring metrics"
           loading="lazy"
           style="display: block; width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 6px;">
    </a>
    <figcaption style="margin-top: 0.5rem; font-style: italic;">
      Figure 7: RDS PostgreSQL CloudWatch dashboard.
    </figcaption>
  </figure>
</div>

## Backend status and systemd logs

The systemctl result shows the backend service as **active (running)**. Recent logs record login activity, deadline scans, and SES email results, including a failure caused by an unverified email identity and later successful deliveries.

<figure style="margin: 1rem auto; max-width: 1000px; text-align: center;">
  <a href="/images/5-Workshop/5.14-logging-and-monitoring/backend-systemd-logs.png" target="_blank" rel="noopener">
    <img src="/images/5-Workshop/5.14-logging-and-monitoring/backend-systemd-logs.png"
         alt="Backend systemd status and recent service logs"
         loading="lazy"
         style="display: block; width: 100%; height: auto; max-height: 500px; object-fit: contain; border-radius: 6px;">
  </a>
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Figure 8: Active backend service and recent systemd logs.
  </figcaption>
</figure>

## Operational monitoring checklist

| Item | How to check | Available evidence |
| --- | --- | --- |
| Lambda/API logs | Lambda execution result and CloudWatch Logs | Figures 1–2 |
| Target Group | Health-check configuration and Targets tab | Figures 3–5 |
| EC2 metrics | Monitoring tab and CloudWatch metrics | Figure 6 |
| RDS metrics | CloudWatch database monitoring | Figure 7 |
| Backend service | systemd status and recent logs | Figure 8 |
