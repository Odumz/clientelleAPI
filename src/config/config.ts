import dotenv from 'dotenv';

dotenv.config();

const env:string = process.env.NODE_ENV || 'dev';

const MONGO_OPTIONS:any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    retryWrites: false,
    socketTimeoutMS: 30000
};

let MONGO_URI:string;

if (env === 'test') {
    MONGO_URI = process.env.TEST_MONGO_URI!;
} else {
    MONGO_URI = process.env.MONGO_URI!;
}

const MONGO:any = {
    mongoUri: MONGO_URI,
    options: MONGO_OPTIONS
};

const PORT:string = process.env.PORT!;

const SERVER:any = {
    port: PORT,
    mongo: MONGO_URI
};

const config:any = {
    mongo: MONGO,
    server: SERVER
};

export default config;
