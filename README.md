# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
# Serverless Auth API — AWS CDK

A serverless REST API protected by Amazon Cognito authentication, built and deployed using AWS CDK (TypeScript).

## Architecture

- **Amazon Cognito** — User Pool for sign up, sign in, and token-based authentication
- **API Gateway** — REST API with a `/protected` route locked behind a Cognito authorizer
- **AWS Lambda** — Python function that handles authenticated requests
- **CloudWatch Logs** — Dedicated log group with 7-day retention policy
- **CloudWatch Alarm** — Triggers on any Lambda error
- **AWS CDK (TypeScript)** — All infrastructure defined and deployed as code

## How It Works

1. A user signs up and signs in via Cognito to receive a JWT token
2. The token is passed in the `Authorization` header when calling the API
3. API Gateway validates the token against the Cognito User Pool
4. If valid, the request reaches the Lambda function and returns a 200 response
5. If no token or invalid token, API Gateway returns 401 Unauthorized

## Project Structure
```
aws-serverless-auth-api/
├── bin/                          # CDK app entry point
├── lambda/
│   └── index.py                  # Lambda handler (Python)
├── lib/
│   └── aws-serverless-auth-api-stack.ts  # CDK stack definition
├── cdk.json                      # CDK configuration
└── README.md
```

## Deploy

### Prerequisites
- AWS CLI configured
- Node.js and CDK CLI installed (`npm install -g aws-cdk`)
- AWS account bootstrapped (`cdk bootstrap`)

### Steps
```bash
npm install
npm run build
cdk deploy
```

### Tear Down
```bash
cdk destroy
```

## Key Outputs After Deploy
- `UserPoolId` — Cognito User Pool ID
- `UserPoolClientId` — App Client ID
- `ApiUrl` — Live API endpoint

## Testing

Hit the protected route without a token to confirm Cognito is enforcing auth:
```bash
curl https://<your-api-url>/prod/protected
# Returns: {"message":"Unauthorized"}
```

## Skills Demonstrated
- AWS CDK (TypeScript) infrastructure as code
- Amazon Cognito user authentication
- Serverless architecture with Lambda and API Gateway
- CloudWatch logging and alerting
- IAM least-privilege role configuration
- CI/CD ready structure with GitHub version control
