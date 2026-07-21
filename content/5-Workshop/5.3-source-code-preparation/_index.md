---
title: "Source Code Preparation"
date: 2026-07-20
weight: 3
pre: " <b> 5.3. </b> "
chapter: false
---

Before deployment to AWS, the source code should be organized so that the frontend, backend, deployment configuration, and documentation remain separate. This structure helps team members find files, install dependencies, and perform deployment steps without mixing application code with sensitive information.

## Project structure

In the actual workspace, the Team Task Management source code is separated into frontend, backend, deployment, and documentation areas as shown below.

<figure style="max-width:420px;margin:20px auto;text-align:center;">
  <a href="/images/5-Workshop/5.3-source-code-preparation/source-code-structure.png" target="_blank" rel="noopener">
    <img src="/images/5-Workshop/5.3-source-code-preparation/source-code-structure.png"
         alt="Team Task Management source-code structure in Visual Studio Code"
         loading="lazy"
         style="width:100%;height:auto;border:1px solid #ddd;border-radius:6px;">
  </a>
  <figcaption><em>Figure 1. The actual Team Task Management source-code structure in Visual Studio Code.</em></figcaption>
</figure>

The main components have these responsibilities:

| Component | Responsibility |
|---|---|
| `backend/` | Contains the Node.js backend, task-management APIs, PostgreSQL access, and deadline-check logic |
| `frontend/` | Contains the login, Manager, and Member interfaces and the static files deployed to S3 |
| `deploy/` | Contains configuration or scripts supporting application and AWS service deployment |
| `docs/` | Stores architecture material, deployment instructions, and project references |
| `docker-compose.yml` | Supports a local container environment for development or testing when required |
| `package.json` | Declares Node.js dependencies and project scripts |
| `package-lock.json` | Locks dependency versions for consistent installation across environments |
| `.gitignore` | Excludes credentials, dependencies, and locally generated files from Git |

The `.agents/` directory contains development-tool metadata and is not part of the application runtime. The `node_modules/` directory is generated after dependency installation and should not be committed to GitHub.

## Clone and install the source code

Clone the repository, enter the project directory, and install dependencies from `package.json`:

```bash
git clone <repository-url>
cd TEAM-TASK-MANAGEMENT
npm install
```

If the frontend and backend have separate `package.json` files, install dependencies in each directory:

```bash
cd backend
npm install

cd ../frontend
npm install
```

After installation, review the scripts in `package.json` and run the application locally before preparing files for AWS deployment.

## Environment-variable management

The `.env` file contains local-only values such as the database endpoint, database credentials, API URL, or internal secret. It must not be committed to GitHub.

The repository should provide an `.env.example` file containing variable names and non-sensitive placeholders only:

```dotenv
DB_HOST=<database-host>
DB_PORT=5432
DB_NAME=<database-name>
DB_USER=<database-user>
DB_PASSWORD=<database-password>
INTERNAL_LAMBDA_SECRET=<secret-value>
```

The following entries should be present in `.gitignore`:

```gitignore
.env
.env.*
node_modules/
*.log
```

Never hard-code an AWS access key, secret access key, RDS password, or Lambda secret in source code. On AWS, EC2 should use an IAM role, while required secrets should be supplied through environment variables or an appropriate secret-management service.

## Pre-deployment review

Before creating AWS infrastructure, confirm that the frontend and backend run locally, dependencies are version-locked, `.env` is not tracked by Git, and the repository contains no credentials. The reviewed directory structure is used throughout the deployment steps beginning with section 5.4.
