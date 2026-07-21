---
title: 'Decoding Apache Celeborn on Amazon EMR – The "Key" to Optimizing Big Data Cost and Performance for Intern DevOps'
date: 2024-01-01
weight: 1
chapter: false
pre: " <b> 3.1. </b> "
---
Hello everyone,

As an intern at AWS with the opportunity to research Big Data & Cloud, my main research topic today is optimizing cost and improving reliability for large-scale data processing (Big Data) systems running Apache Spark on AWS.

Anyone who has ever "swum" in large-scale Spark projects knows a classic pain point: data shuffling (Shuffle). This is the stage where intermediate servers exchange massive amounts of data over the network, consuming enormous disk resources and bandwidth.

On July 15, 2026, AWS experts published an exceptionally deep technical article: "High-performance remote shuffle service on Amazon EMR with Apache Celeborn". This article opened up an entirely new way of thinking for me about data system architecture, thoroughly addressing the trade-off between low cost (using EC2 Spot) and Spark application reliability.

### The "Three Headaches" of Traditional Shuffle Mechanisms

During hands-on experiments in the Lab with Amazon EMR clusters (both on traditional EC2 and on EKS/Kubernetes), I kept running into three major barriers:

1. **Sudden Spot Instance Interruption:** Using EC2 Spot can save up to 90% on cost. However, when AWS reclaims a server (with only a 2-minute warning), all Shuffle data stored locally on that machine disappears. Spark is forced to recompute from scratch the previous stages (Cascade Recomputation), extending runtime and wiping out the cost savings.
2. **Storage Resource Waste (Over-provisioning):** The traditional shuffle mechanism (External Shuffle Service - ESS) requires every compute node (Worker Node) to carry extra large disk capacity as a buffer for Shuffle data. In practice, only a few nodes run at full capacity while the rest sit idle, yet the business still pays for the disk storage.
3. **Systems "Stuck" and Unable to Scale In (Under-utilized scale-in):** To avoid losing Shuffle data, Spark prevents idle nodes from scaling in. As a result, the server cluster keeps ballooning wastefully long after the main task has finished.

### The Lifesaver Solution: What Is Apache Celeborn?

Apache Celeborn is an open-source Remote Shuffle Service (RSS). It thoroughly solves the problems above by completely separating the lifecycle of Shuffle data from Spark compute nodes (Executors).

Celeborn operates on a Leader - Worker - Client architecture:

* Instead of writing Shuffle data to local disk, Spark Executors push data directly to a dedicated Celeborn server cluster, optimized specifically for memory and bandwidth.
* **100% Spot-compatible:** Because Shuffle data is safely stored on an independent Celeborn cluster, Spark Executors on EMR can run entirely on EC2 Spot. If an Executor is reclaimed, Spark only needs to spin up another machine to continue without recomputing from scratch.
* **Smart Push-based model:** Reduces the complex $N \times M$ network connections during the data read phase, significantly improving performance and system stability at large scale.

![Push-based remote shuffle service for Spark on EMR](/images/3-BlogsPosted/3.1-Blog1/page_4_img_1.png)

### Solution Architecture Analysis

In the article, the authors designed an extremely practical model that I successfully applied in my school's Lab:

* **Fully Segregated Cluster:** The Celeborn cluster runs on a dedicated Amazon EKS cluster, completely separate from the Spark runtime environment (which can be EMR on EKS or EMR on EC2). This allows each side to optimize its own hardware configuration: Celeborn chooses machine types optimized for I/O and Memory, while Spark chooses machine types optimized for CPU.
* **Connection via Internal NLB:** EMR clusters connect to the Celeborn cluster through an Internal Network Load Balancer (NLB) within the same secure VPC.
* **High Resiliency:** Celeborn Leader nodes run as StatefulSets using EBS gp3 to maintain Raft consensus state. On the Worker side, Shuffle data is stored on local NVMe drives for maximum speed, while also being configured to replicate to 2 different Workers to guard against physical node failure.

![Solution architecture](/images/3-BlogsPosted/3.1-Blog1/page_4_img_2.png)

### The Most Important Spark Client Configuration

To configure your Spark application to use Celeborn as the Shuffle Manager, here are the essential parameters to set:

```properties
# Tắt dịch vụ xáo trộn mặc định của Spark
spark.shuffle.service.enabled=false

# Khai báo trình quản lý của Celeborn
spark.shuffle.manager=org.apache.spark.shuffle.celeborn.SparkShuffleManager
spark.shuffle.sort.io.plugin.class=org.apache.spark.shuffle.celeborn.CelebornShuffleDataIO

# Trỏ tới địa chỉ Internal NLB của cụm Celeborn
spark.celeborn.master.endpoints=<NLB_DNS_NAME>:9097

# Bật tính năng sao chép dữ liệu để chống mất mát dữ liệu trên Worker
spark.celeborn.client.push.replicate.enabled=true

# Tắt chế độ đọc xáo trộn cục bộ (Bắt buộc)
spark.sql.adaptive.localShuffleReader.enabled=false
```

### Real-World Experience and Review from an Intern

After following the article's guidance and successfully deploying this system using sample code (CloudFormation and Helm Chart) from AWS's GitHub repository, I drew some extremely valuable lessons:

1. **Highly Standard Observability Infrastructure:** The article guides integration of the ADOT (AWS Distro for OpenTelemetry) collector to scrape Prometheus metrics from Celeborn and push them to Amazon Managed Grafana. I can visually monitor active Shuffle data volume and JVM Garbage Collection (GC) status right on the Dashboard.
2. **Clearly Reduced Latency:** Thanks to Celeborn's transition from traditional Pull-based to Push-based mechanisms, my large analytics jobs saw reduced network I/O bottlenecks, making Job Duration much more stable.
3. **Practical Cost Optimization:** I experimented with abruptly shutting down and restarting Spot Instances running Spark Executors mid-run. The results matched what the article described: tasks continued running smoothly on new nodes without recomputing the previous stage, because Shuffle data was safely protected in the Celeborn cluster.

![Grafana dashboard for Celeborn Metrics](/images/3-BlogsPosted/3.1-Blog1/page_5_img_3.png)

### Conclusion

For anyone operating large-scale data systems on AWS, migrating to a **Remote Shuffle Service** architecture like Apache Celeborn is the optimal solution to end the painful trade-off between **cost** and **reliability**.

As an intern, building and successfully configuring this system with my own hands not only helped me achieve top marks for my research project, but also shaped my thinking around proper Cloud system design, ready for real enterprise environments.

Thank you everyone for reading! Has anyone in our group already applied Remote Shuffle Service (Celeborn, Uniffle, etc.) to production Spark systems? Please share your operational experience below!

Here is the link to the original article and source code: [AWS Blog - High Performance Remote Shuffle Service on Amazon EMR with Apache Celeborn](https://aws.amazon.com/vi/blogs/big-data/high-performance-remote-shuffle-service-on-amazon-emr-with-apache-celeborn/)