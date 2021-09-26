FROM node:14.16.0-alpine3.10
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "dev"]