#!/bin/sh

echo "shell script started"
cd ..
echo $PWD
npm run build

echo "docker image build starting"
docker build --no-cache  -t bsa -f devops/Dockerfile .
echo "docker image generated"

AWS_CLI_VERSION=$(aws --version)

echo $AWS_CLI_VERSION

if [[ $AWS_CLI_VERSION == "" ]]; then
    echo "ERROR: Command 'aws' not found, please install 'awscli' and continue."
    echo "Once installed run 'aws configure' to configure aws credentials."
    exit 1
fi

docker login --username AWS --password $(aws ecr get-login-password --region ap-south-1) xxxxxxxxxx.dkr.ecr.ap-south-1.amazonaws.com
docker tag bsa:latest xxxxxxxxxx.dkr.ecr.ap-south-1.amazonaws.com/bsa:latest
docker push xxxxxxxxxx.dkr.ecr.ap-south-1.amazonaws.com/bsa:latest
echo "pushed to AWS ECR"

echo "shell script finished!"