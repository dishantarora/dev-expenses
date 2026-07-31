# DevOps setup for dev-expenses

This project now includes a simple starter DevOps setup for learning purposes.

## What is included
- Docker container build
- GitHub Actions CI workflow
- AWS deployment workflow for ECR/ECS
- Terraform environment variable files for dev, qa, uat, and prod

## How to use it
1. Push code to GitHub.
2. GitHub Actions runs lint and build.
3. Pushing to `develop`, `qa`, `uat`, or `main` can trigger deployment.
4. Configure AWS secrets in GitHub and ensure the target AWS resources exist.

## Recommended learning path
- Start with `dev`
- Then add `qa`
- Then `uat`
- Finally `prod`

## Required GitHub secrets
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Terraform environments
Use the files in `terraform/environments/` with Terraform commands such as:

```bash
terraform -chdir=terraform init
terraform -chdir=terraform plan -var-file=environments/dev.tfvars
```

## Notes
This setup is intentionally simple for learning. It is a good base before adding more advanced topics like production networking, approvals, or full blue/green traffic switching.
