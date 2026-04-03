#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsServerlessAuthApiStack } from '../lib/aws-serverless-auth-api-stack';

const app = new cdk.App();
new AwsServerlessAuthApiStack(app, 'AwsServerlessAuthApiStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
