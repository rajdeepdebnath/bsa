FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY dist/ .

EXPOSE 3002

CMD [ "node", "index.js" ]