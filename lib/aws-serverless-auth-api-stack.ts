import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as logs from 'aws-cdk-lib/aws-logs';

export class AwsServerlessAuthApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Cognito User Pool
    const userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'serverless-auth-user-pool',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireDigits: true,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Cognito App Client
    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool,
      userPoolClientName: 'serverless-auth-client',
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });

    // CloudWatch Log Group
    const logGroup = new logs.LogGroup(this, 'ApiLambdaLogGroup', {
      logGroupName: '/aws/lambda/serverless-auth-api',
      retention: logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Function
    const apiLambda = new lambda.Function(this, 'ApiLambda', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
      logGroup: logGroup,
      environment: {
        USER_POOL_ID: userPool.userPoolId,
        CLIENT_ID: userPoolClient.userPoolClientId,
      },
    });

    // Cognito Authorizer
    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'Authorizer', {
      cognitoUserPools: [userPool],
    });

    // API Gateway
    const api = new apigateway.RestApi(this, 'ServerlessAuthApi', {
      restApiName: 'Serverless Auth API',
      description: 'API protected by Cognito authentication',
    });

    const protectedRoute = api.root.addResource('protected');
    protectedRoute.addMethod('GET', new apigateway.LambdaIntegration(apiLambda), {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });

    // CloudWatch Alarm for Lambda errors
    new cloudwatch.Alarm(this, 'LambdaErrorAlarm', {
      alarmName: 'serverless-auth-lambda-errors',
      metric: apiLambda.metricErrors(),
      threshold: 1,
      evaluationPeriods: 1,
      alarmDescription: 'Alert when Lambda function errors occur',
    });

    // Outputs
    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId });
    new cdk.CfnOutput(this, 'ApiUrl', { value: api.url });
  }
}
