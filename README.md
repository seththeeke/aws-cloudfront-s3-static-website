# AWS Cloudfront S3 Static Website

## Summary

This repo contains a cloudformation template, using the AWS SAM Toolkit, that will create the infrastructure to host a static website from an S3 Bucket. It will also put a Cloudfront Distribution in front of your website to optimize for global traffic and allow you to associate a domain name for your site by simply running the deploy commands with the domain name information or updating the template's default values. 

## Prerequisites

1. Sign up for an [AWS Account](https://aws.amazon.com)
2. Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
3. Install the [SAM Toolkit](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
4. Setup your [local credentials for the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

## How To Use This Project

### What's in This Repo

There are 2 things in this repository, a CloudFormation template that provides the infrastructure for your website, the template.yaml, and a reference website built using React. There is nothing significant about the React website. You can use any framework you desire, but this project doesn't go into specifics about other frameworks.

### Step By Step Guide

#### Complete the Prerequisites

Do it! See above

#### Register a Domain Name

In your AWS account, we need to register an domain name in order to attach to your static website. Registering a domain name cannot be done programmatically, you can follow the [AWS Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html) to register your domain name. This can take a day or 2 to complete.

#### Configure the SAM Template

The SAM Template uses Cloudformation parameters to specify the domain name for your website infrastructure. There are numerous ways to configure those values, but this guide will have you just set the default values in the template with the values you need.

1. Open the template.yaml file
2. You will see the parameters section of the template, it will look like the below
```
Parameters:
  S3StaticWebsiteBucketNameParameter: 
    Type: String
    Default: <INSERT_WEBSITE_URL_HERE>
    Description: The bucket name for the static web content
  DomainNameParameter:
    Type: String
    Default: <INSERT_WEBSITE_URL_HERE>
    Description: The domain name for the website, this needs to be registered prior
  HostedZoneNameParameter: 
    Type: String
    Default: <INSERT_HOSTED_ZONE_NAME_HERE>
    Description: The name of the hosted zone, this was created when you registered the domain name
```
3. Replace the "Default" values with the static website url and hosted zone name that is created from registering your domain. For example, if you register the domain, "mynameisgrant.com", your parameters section will look like the below
```
Parameters:
  S3StaticWebsiteBucketNameParameter: 
    Type: String
    Default: mynameisgrant.com
    Description: The bucket name for the static web content
  DomainNameParameter:
    Type: String
    Default: mynameisgrant.com
    Description: The domain name for the website, this needs to be registered prior
  HostedZoneNameParameter: 
    Type: String
    Default: mynameisgrant.com.
    Description: The name of the hosted zone, this was created when you registered the domain name
```
**Note**: Make sure to note the hosted zone name has an additional "." after .com

#### Build and Deploy the SAM Template

Using the SAM CLI, you will build the project infrastructure by using the following commands. 

```
$ sam build
```

This will generate the .aws-sam directory which contains the actual Cloudformation template synthesized from the SAM syntax

Now we need to deploy the infrastructure

```
$ sam deploy
```

The actual certficate verification for the domain name is currently manual. You'll need to navigate to the Certificate Manager console in AWS, find the record awaiting verification, and click the button on the certificate to manually create the A Record. This could be automated through a Lambda custom resource but I haven't found the time yet. This process can take some time, especially the first time because certificate registration can take some time and a CloudFront distribution can take anywhere from 15-60 minutes when created from scratch.

#### Build and Deploy Your Website

For these instructions, we will use the reference website in the react-website directory, but you can use any framework you'd like. 

1. Navigate to the react-website directory
```
cd react-website
```
2. Install dependencies
```
npm install
```
3. Build the website
```
npm run-script build
```
4. Move your website into the S3 bucket
```
aws s3 sync build/ s3://<insert_bucket_name> --acl public-read
```

#### Test and Done! $$$

After syncing your assets, you will be able to navigate to the domain name you've registered and see your static website. Woohoo! Go and build things!
