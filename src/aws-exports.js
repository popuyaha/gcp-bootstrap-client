import configs from "./config";

const config = {
  // To get the AWS Credentials, you need to configure
  // the Auth module with your Cognito Federated Identity Pool
  Auth: {
    identityPoolId: configs.cognito.IDENTITY_POOL_ID,
    region: configs.cognito.REGION,
    userPoolId: configs.cognito.USER_POOL_ID,
    userPoolWebClientId: configs.cognito.APP_CLIENT_ID,
    mandatorySignIn: false,
    clientMetadata: { app: "Mlog" }
  },
  Analytics: {
    disabled: false,
    autoSessionRecord: true,
    AWSPinpoint: {
      appId: process.env.PINPOINT_APP_ID,
      region: configs.cognito.REGION
    }
  },
  Storage: {
    region: configs.s3.REGION,
    bucket: configs.s3.BUCKET,
    identityPoolId: configs.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: configs.apiGateway.URL,
        region: configs.apiGateway.REGION
      },
      {
        name: "board",
        endpoint: configs.apiGateway.URL,
        region: configs.apiGateway.REGION
      },
      {
        name: "reply",
        endpoint: configs.apiGateway.URL,
        region: configs.apiGateway.REGION
      },
      {
        name: "rereply",
        endpoint: configs.apiGateway.URL,
        region: configs.apiGateway.REGION
      }
    ]
  }
};

export default config;
