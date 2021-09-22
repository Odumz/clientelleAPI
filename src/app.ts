import http from 'http';
import express, { Request, Response, NextFunction} from 'express';
import logging from './config/logging';
import config from './config/config';
import routes from './routes';
import db from './config/db'
import cors from 'cors'
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';

const NAMESPACE = 'api';
const app = express();

// connect to database
db.connectDB()

// define swagger document
const swaggerDoc = YAML.load(`${process.cwd()}/swagger.yaml`);

// use swagger doc
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, { explorer: true }))

// Configure logger
app.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], STATUS - [${res.statusCode}], IP - [${req.socket.remoteAddress}]`);
    });

    next();
});

const allowedOrigins = ['https://https://clientelle.vercel.app/', 'http://localhost:8080'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors(options));

// parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rules of the api
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', ['*']);
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

//export app
export default app
