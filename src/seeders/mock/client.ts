import faker from 'faker'

const seedClients = async (numOfClients: number, providers: any) => {
    const clients = [];

    for (let i = 0; i < numOfClients; i++) {
        const client  = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            phone: faker.datatype.number({ min: 9999999999, max: 99999999999999}),
            provider: faker.random.arrayElement(providers)
        };

        clients.push(client);
    }

    return clients;
};

export default {
    seedClients
}