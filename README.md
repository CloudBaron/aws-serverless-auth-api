# Welcome to your CDK TypeScript project
# AWS Serverless Auth API

A serverless REST API with token-based authentication built with AWS CDK (TypeScript).

## Architecture

- **Amazon Cognito** — User Pool with email-based sign-up and token issuance
- **AWS Lambda** — Protected function handler (Node.js 18)
- **Amazon API Gateway** — REST API with Cognito authorizer enforcing JWT validation
- **Amazon CloudWatch** — Log group with 1-week retention and access logging
- **IAM** — Least-privilege role scoped to Lambda log writes

## Prerequisites

- AWS CLI configured (`aws configure`)
- Node.js 18+
- AWS CDK CLI (`npm install -g aws-cdk`)

## Deploy
```bash
npm install
cdk bootstrap
cdk deploy
```

## Key Outputs After Deploy

- `UserPoolId` — Cognito User Pool ID
- `UserPoolClientId` — App Client ID
- `ApiUrl` — Live API endpoint

## Test

Hit the protected route without a token to confirm Cognito is enforcing auth:
```bash
curl https://<your-api-url>/prod/protected
# Returns: {"message":"Unauthorized"}
```

## Skills Demonstrated

- AWS CDK (TypeScript) infrastructure as code
- Amazon Cognito user authentication and JWT enforcement
- Serverless architecture with Lambda and API Gateway
- CloudWatch logging and access log configuration
- IAM least-privilege role configuration
