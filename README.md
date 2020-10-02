# scoreboard-serverless-framework

## About this project
This project is build using React (>16.8) and [Serverless Framework](https://www.serverless.com/)

## Set Up
#### ENV
You will need to add the following variables to your `.env` file \
`AWS_ACCESS_KEY_ID` \
`AWS_SECRET_ACCESS_KEY` \
`REACT_APP_API_ENDPOINT` => Make sure to update if you are using the production vs local endpoint

## Running the app
You can use `npm start` to run the parcel process that will spin up the app. 

## Deploying
You can deploy the App to production using `sls deploy`. This will drop the app into an S3 bucket and create the CloudFront distribution. You can also customize the `serverless.yml` file to add a custom URL
