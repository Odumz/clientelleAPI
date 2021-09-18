import http from 'http';
import express, { Request, Response, NextFunction} from 'express';
import logging from './config/logging';
import config from './config/config';
import routes from './routes';
import mongoose from 'mongoose';

const NAMESPACE = 'api';
const app = express();

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
app.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], STATUS - [${res.statusCode}], IP - [${req.socket.remoteAddress}]`);
    });

    next();
});

// parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rules of the api
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', ['https://clientelle.vercel.app', 'http://localhost:8080']);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        return res.status(200).json({});
    }

    next();
});

// routes
app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response): void => {
     res.status(200).json({
        message: 'Welcome to the Clientelle API built with nodejs, express, and mongodb!'
    });
});

// error handling
app.use((req: Request, res: Response, next: NextFunction): void => {
    const error = new Error('the route does not exist');

    res.status(404).json({
        message: error.message
    });

    next();
});

// create server
const server = http.createServer(app);
server.listen(config.server.port, (): void => {
    logging.info(NAMESPACE, `Server listening on port ${config.server.port}`);
});
