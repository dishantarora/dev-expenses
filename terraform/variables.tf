variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "ecr_repo_name" {
  description = "ECR repository name"
  type        = string
  default     = "dev-expenses"
}

variable "cluster_name" {
  description = "ECS cluster name"
  type        = string
  default     = "dev-expenses-cluster"
}

variable "service_name" {
  description = "Base service name used for blue/green resources"
  type        = string
  default     = "dev-expenses"
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "public_subnet_ids" {
  description = "Public subnets for the ALB"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "Private subnets for Fargate tasks"
  type        = list(string)
}
