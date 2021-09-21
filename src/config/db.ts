import mongoose from 'mongoose';
import config from './config';
import logging from './logging';

const NAMESPACE = 'api';

// connect to database
const connectDB = async () => {
    try {
        await mongoose
            .connect(config.mongo.mongoUri, config.mongo.options);
        logging.info(NAMESPACE, 'Connected to mongoDB');
    } catch (err: any) {
        logging.error(NAMESPACE, err.message, err);
        process.exit(1);
    }
};

const clearDB = async (model: any) => {
    logging.warn(NAMESPACE, 'Clearing database...')
    await Promise.all(
        Object.values(mongoose.connection.collections).map(async (collection: any) => 
            collection.deleteMany()
        )
    );
    await model.deleteMany();
};

const disconnectDB = async () => {
    logging.warn(NAMESPACE, 'Disconnecting from database...');
    await mongoose.disconnect();
}

export default {
    connectDB,
    clearDB,
    disconnectDB
}