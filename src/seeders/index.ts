import logging from '../config/logging'
import ClientModel from '../models/client'
import ProviderModel from '../models/provider'
import db from '../config/db'
import client from './mock/client'
import provider from './mock/provider'

const NAMESPACE = 'seeder'

const seedDB = async () => {
    try {
        logging.info(NAMESPACE, 'Seeding database...')
        await db.connectDB();
        await db.clearDB(ClientModel);
        await db.clearDB(ProviderModel);

        logging.info(NAMESPACE, 'Creating random providers')
        const fakeProviders = await ProviderModel.create(
            await provider.seedProviders(7)
        );

        logging.info(NAMESPACE, 'Creating random clients')
        const fakeClients = await ClientModel.create(
            await client.seedClients(10, fakeProviders)
        );

        logging.info(NAMESPACE, 'Seeding complete')

    } catch (err) {
        logging.error(NAMESPACE, 'an error has occured', err)
    }

    await db.disconnectDB();
};

seedDB();