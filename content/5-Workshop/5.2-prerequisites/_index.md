---
title: "Prerequisites"
date: 2026-07-20
weight: 2
pre: " <b> 5.2. </b> "
chapter: false
---

Prepare an AWS account, GitHub, Git, Node.js, npm, AWS CLI, PostgreSQL client, required IAM permissions, and verified SES email identities. Set the region to `ap-southeast-1`.

## IAM permissions

In the lab environment, the account belongs to the **Project-Developers** group. The screenshot records the two policies attached to the group at deployment time: **AdministratorAccess** and the customer-managed **testpolicy**.

<figure style="margin: 1rem auto; max-width: 900px; text-align: center;">
  <img src="/images/5-Workshop/5.2-prerequisites/iam-project-developers-permissions.png"
       alt="Policies attached to the Project-Developers IAM user group"
       loading="lazy"
       style="display: block; width: 100%; height: auto; border-radius: 6px;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Figure 1: Policies attached to the Project-Developers IAM group in the lab environment.
  </figcaption>
</figure>


## Verification

Use the AWS CLI to inspect the configured Region and confirm the identity of the current principal:

<figure style="margin: 1rem auto; max-width: 760px; text-align: center;">
  <img src="/images/5-Workshop/5.2-prerequisites/aws-account-region-verification.png"
       alt="Verify the AWS Region and caller identity"
       loading="lazy"
       style="display: block; width: 100%; height: auto; border-radius: 6px;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Figure 2: Checking the Region configuration and AWS caller identity.
  </figcaption>
</figure>

Check the versions of the required tools on the deployment machine:

<figure style="margin: 1rem auto; max-width: 760px; text-align: center;">
  <img src="/images/5-Workshop/5.2-prerequisites/local-tool-versions.png"
       alt="Verify Node.js, PostgreSQL client, npm, Git, and AWS CLI versions"
       loading="lazy"
       style="display: block; width: 100%; height: auto; border-radius: 6px;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Figure 3: Checking tool versions on the deployment machine.
  </figcaption>
</figure>

Observed results:

- Node.js: **v24.18.0**
- PostgreSQL client (psql): **15.18**
- npm: **11.16.0**
- Git: **2.50.1**
- AWS CLI: **2.33.15**

## Verify Amazon SES email identities

The two email identities used by the project's email function were verified in Amazon SES in the **Asia Pacific (Singapore)** Region.

<figure style="margin: 1rem auto; max-width: 900px; text-align: center;">
  <img src="/images/5-Workshop/5.2-prerequisites/ses-verified-email-identities.png"
       alt="Two email identities with Verified status in Amazon SES"
       loading="lazy"
       style="display: block; width: 100%; height: auto; border-radius: 6px;">
  <figcaption style="margin-top: 0.5rem; font-style: italic;">
    Figure 4: Verified email identities in Amazon SES.
  </figcaption>
</figure>
