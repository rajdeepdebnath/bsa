#!/bin/sh

echo "shell script started"
cd ..
echo $PWD
npm run build

echo "docker image build starting"
docker build --no-cache  -t bsa -f devops/Dockerfile .
echo "docker image generated"

aws ecr get-login-password --region ap-south-1 
docker tag bsa:latest 277991196711.dkr.ecr.ap-south-1.amazonaws.com/bsa:latest
docker push 277991196711.dkr.ecr.ap-south-1.amazonaws.com/bsa:latest
echo "pushed to AWS ECR"

echo "shell script finished!"