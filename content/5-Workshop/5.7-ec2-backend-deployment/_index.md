---
title: "EC2 Backend Deployment"
date: 2026-07-20
weight: 7
pre: " <b> 5.7. </b> "
chapter: false
---

Launch Amazon Linux 2023 `t3.micro` in the private app subnet with an IAM role for Session Manager. Install Node.js and Git, configure environment variables, create a systemd service, and verify the local health endpoint.

```bash
sudo systemctl daemon-reload
sudo systemctl enable teamtask
sudo systemctl start teamtask
sudo systemctl status teamtask
curl http://localhost:3000/health
```

```bash
sudo journalctl -u teamtask.service -n 100
```
## IAM role and instance launch

1. Create an IAM role trusted by EC2 and add the permissions required for Systems Manager and the application integrations. Avoid broad administrator policies.
2. Name and create the role, then attach it as the EC2 instance profile.
3. Launch the backend instance in the private application subnet with no public IPv4 address.
4. Connect through Session Manager, deploy the backend, enable the systemd service, and test `localhost:3000`.

![Create EC2 IAM role](/images/5-Workshop/teamtask-deployment/step-16.png)

![Add role permissions](/images/5-Workshop/teamtask-deployment/step-17.png)

![Name and create the role](/images/5-Workshop/teamtask-deployment/step-18.png)

![Launch the backend EC2 instance](/images/5-Workshop/teamtask-deployment/step-20.png)


