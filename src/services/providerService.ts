import ApiError from '../helpers/ApiError';
import { Request } from 'express';
import Provider from '../models/provider'

const create = async (req: Request) => {
    try {
        const data = req.body;

        const provider = await Provider.create(data);

        return JSON.parse(JSON.stringify(provider));
    } catch (err: any) {
        throw new ApiError(err.code || 500, err.message || err);
    }
};

const listAll = async (criteria: any = {}, options:any = {}) => {
    const { sort = { createdAt: -1 }} = options;

    let providers = await Provider.find(criteria)
        .sort(sort)
        .select('_id name');

    return providers
};

const listOne = async (criteria: any) => {
    try {
        console.log(criteria);
        
        const provider = await Provider.findOne(criteria)
            .select('_id name');

        if (!provider) {
            throw new ApiError(404, 'Provider not found');
        }

        return JSON.parse(JSON.stringify(provider));
    } catch (error: any) {
        throw new ApiError(error.code || 500, error.message || error);
    }
};

const edit = async (providerId: any, req: any) => {
    let provider = await Provider.findById(providerId);

    if (!provider) {
        throw new ApiError(404, 'Provider not found')
    }

    let data = req.body;

    Object.assign(provider, data);
    await provider.save();
    return provider;
};

const remove = async (providerId: any) => {
    let provider = await Provider.findById(providerId);

    if (!provider) {
        throw new ApiError(404, 'Provider not found');
    }
    
    const deletedProvider = await Provider.findOneAndDelete(providerId)
    return deletedProvider;
};

const count = async (criteria: any = {}) => {
    return await Provider.find(criteria).countDocuments();
};

export default {
    create,
    edit,
    listAll,
    listOne,
    remove,
    count
};