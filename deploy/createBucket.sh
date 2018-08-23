#!/bin/bash
set -e

# Extract bamboo variables
deployEnvironment=$bamboo_deploy_environment # DEV, QUAL, or PROD

# Extract environment variables
bucketName="${bamboo_BUCKET_NAME}-${deployEnvironment,,}"

# Look up the ARN for the environment we are deploying into
adminARN="$(printenv bamboo_SAI_${deployEnvironment}_ADMIN_ARN )"
echo "Assuming role: $adminARN"
source /bin/assumeRole $adminARN

echo "Creating Bucket..."
aws s3 mb s3://$bucketName

echo "Successfully Created Bucket"
