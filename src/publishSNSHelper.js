const AWS = require('aws-sdk');
const config = require('../config');

const publishToSNS = async (message, arn) => {
  const params = {
    Message: message,
    TopicArn: arn,
  };
  AWS.config.update({ region: 'us-east-1' });
  const awsSNS = new AWS.SNS({ apiVersion: '2010-03-31' });
  await awsSNS.publish(params).promise();
};

const publishToSNSSuccess = async (message) => {
  await publishToSNS(message, config.SNS_SUCCESS_ARN);
};

const publishToSNSUnsuccessfull = async (message) => {
  await publishToSNS(message, config.SNS_NONSUCCESS_ARN);
};

module.exports = {
  publishToSNS,
  publishToSNSSuccess,
  publishToSNSUnsuccessfull,
};
