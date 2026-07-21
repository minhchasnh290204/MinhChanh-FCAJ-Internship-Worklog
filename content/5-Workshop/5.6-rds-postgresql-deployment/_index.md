---
title: "RDS PostgreSQL Deployment"
date: 2026-07-20
weight: 6
pre: " <b> 5.6. </b> "
chapter: false
---

Create private Single-AZ RDS instance `task-postgres-db` and database `taskdb`. Store credentials outside Git, connect with `psql` from EC2, create the schema, and seed only non-sensitive demo data. Record a successful query.

## Console procedure

1. Open Amazon RDS and create the PostgreSQL database.
2. Select the private DB subnet group and the PostgreSQL security group.
3. Keep public access disabled and use Single-AZ only for the learning/demo environment.
4. Wait for `Available`, then test connectivity from EC2 and record a successful query.

![RDS database creation](/images/5-Workshop/teamtask-deployment/step-19.png)

