import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    retryWrites: false,
    socketTimeoutMS: 30000
};

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/clientile';

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
