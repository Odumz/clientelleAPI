import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'dev';

const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    retryWrites: false,
    socketTimeoutMS: 30000
};

let MONGO_URI:string = '';

if (env === 'test') {
    MONGO_URI = process.env.TEST_MONGO_URI!;
} else {
    MONGO_URI = process.env.MONGO_URI!;
}

const MONGO = {
    mongoUri: MONGO_URI,
    options: MONGO_OPTIONS
};

const PORT = process.env.PORT || 5000;

const SERVER = {
    port: PORT,
    mongo: MONGO_URI
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;
