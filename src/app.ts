import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import routes from './routes';
import mongoose from 'mongoose';

const NAMESPACE = 'api';
const router = express();

// connect to database
mongoose
    .connect(config.mongo.mongoUri, config.mongo.options)
    .then(() => {
        logging.info(NAMESPACE, 'Connected to mongoDB');
    })
    .catch((err) => {
        logging.error(NAMESPACE, err.message, err);
    });

// Configure logger
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], STATUS - [${res.statusCode}], IP - [${req.socket.remoteAddress}]`);
    });

    next();
});

// parse the request body
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// rules of the api
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['https://clientelle.vercel.app', 'http://localhost:8080']);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        return res.status(200).json({});
    }

    next();
});

// routes
router.use('/api/v1', routes);

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to the Clientelle API built with nodejs, express, and mongodb!'
    });
});

// error handling
router.use((req, res, next) => {
    const error = new Error('the route does not exist');

    return res.status(404).json({
        message: error.message
    });

    next();
});

// create server
const server = http.createServer(router);
server.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server listening on port ${config.server.port}`);
});
