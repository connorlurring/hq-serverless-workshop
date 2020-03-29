# Introduction to RESTful APIs on AWS with Serverless!

This workshop is designed to show how to make a quick, serverless, RESTful memo API on AWS.



***

## Prerequisites
To follow along you will need a couple of things:
* [Insomnia](https://insomnia.rest/) - REST client
* [Node.js](https://nodejs.org/en/download/)
* [Serverless](https://serverless.com/)
* [AWS Account](https://aws.amazon.com/)

### Serverless
In order to [install](https://serverless.com/framework/docs/getting-started#install-via-npm) Serverless, the easiest way is through npm after you have installed Node.js

### AWS Account
Once you have installed Serverless, create an [AWS account](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=default&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start) and configure it as shown on the Serverless site where it says ["Setup with `serverless config credentials` command"](https://serverless.com/framework/docs/providers/aws/guide/credentials#setup-with-serverless-config-credentials-command), making sure to substitute the `key` and `secret` in the command for the ones provided from the creation of your IAM user.