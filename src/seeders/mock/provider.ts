import faker from 'faker';

// create seedProvider function to add the random providers
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
