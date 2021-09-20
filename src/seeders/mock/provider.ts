import faker from 'faker';

const seedProviders = async (numOfProviders: number) => {
    const providers = [];

    for (let i = 0; i < numOfProviders; i++) {
        const provider = {
            name: faker.random.word()
        };

        providers.push(provider);
    }

    return providers;
};

export default {
    seedProviders
};
