# Clientelle API

## Overall Objective
Create restful APIs for a practical test for fullstack javascript developer with experience in Vue, Node.js, Express, MongoDB, and Swagger.

## Project setup

- [Install Node](https://nodejs.org/en/download/) if you do not have it already.
- [Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/) if you do not have it already.
- Clone the repo `git clone https://github.com/Odumz/clientelleAPI.git`
- Create a env file by running `touch .env`
- Copy the fields from `sample_env` and replace with correct fields in your `.env` file.
- Install all dependencies by running `npm install || npm i`
- Seed the database by running `npm run seed`

### Compiles and hot-reloads for development
Run `npm run dev` to start the development server. It will automatically rebuild the app upon file change.

local url for development: http://localhost:5000 //or PORT

### Compiles and hot-reloads for production
Run `npm run build` to start the production server.

### Run tests
Run `npm run test` in the terminal to run the tests.

## Project links
- [GitHub](https://github.com/Odumz/clientelleAPI.git)
- [Swagger Documentation](https://clientelle.herokuapp.com/api-docs)
- [Demo](https://clientelle.herokuapp.com)
- [Front-end Demo](https://clientelle.vercel.app)
- [Postman](https://www.getpostman.com/collections/e10623717c805eca5c0a)

### How to use the Swagger Documentation
#### Live Documenation
 - Click on [this link](https://clientelle.herokuapp.com/api-docs) to open the hosted swagger documentation
 - Change the schemes to `https` and click on `Try it out` to execute the request

#### Local Documenation
 - Click on [this link](http://localhost:5000/api-docs) or copy and paste `http://localhost:PORT/api-docs` to your browser to open the local swagger documentation where port is your defined port variable in the env file.
 - Change the schemes to `http` and click on `Try it out` to execute the request

### How to use the Postman Documentation
 - Click on [this link](https://www.postman.com/downloads) to download and install postman for your system if you do not have it already.
 - Open the postman application and click on `Import` to import the postman collection. 
 - Click on `Import` and select the `Link` from the options.
 - Copy [this link](https://www.getpostman.com/collections/e10623717c805eca5c0a) `https://www.getpostman.com/collections/e10623717c805eca5c0a` and paste it in the `Link` field.
 - Click on `Continue` to finish import and it will automatically open the postman collection.
```
Postman environment variables:
 {{ URL }} : http://localhost:5000 //or PORT - local url for development
 {{ URL_API }} : http://localhost:5000/api/v1 //or PORT/api/v1 - local api url for development
 {{ LURL }} : https://clientelle.herokuapp.com - live url for development
 {{ LURL_API }} : https://clientelle.herokuapp.com/api/v1 - live api url for development
 ```