FROM public.ecr.aws/lambda/nodejs:18

#WORKDIR /usr/src/app

COPY package*.json  ${LAMBDA_TASK_ROOT}
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY dist/  ${LAMBDA_TASK_ROOT}

CMD [ "lambda.handler" ]