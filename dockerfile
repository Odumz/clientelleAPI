FROM node:16-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build