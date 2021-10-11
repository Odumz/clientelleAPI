import ApiError from '../helpers/ApiError';
import { Request } from 'express';
import Provider from '../models/provider';

const create = async (req: Request) => {
    try {
        const data = req.body;

        const existingProvider = await Provider.findOne({ name: data.name });

        if (existingProvider) {
            throw new ApiError(409, 'Provider with this name exists');
        }

        const provider = await Provider.create(data);

        return JSON.parse(JSON.stringify(provider));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const listAll = async (options: any = {}, criteria: any = {}) => {
    try {
        let sorter: number = -1;
        let sortOption: any = {};

        if (options.sortBy) {
            const parts = options.sortBy.split(':');
            sorter = parts[1] === 'asc' ? 1 : 'desc' ? -1 : 1;
            parts[0] === 'name' ? (sortOption = { name: sorter }) : (sortOption = { createdAt: sorter });
        }

        if (criteria.name) {
            const newQuery = criteria.name.split(',') || [];
            criteria = {'name': { "$in": newQuery}}
        }

        const { sort = sortOption } = options;
        
        let providers = await Provider.find(criteria).sort(sort).select('_id name');

        return JSON.parse(JSON.stringify(providers));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const listOne = async (criteria: string) => {
    try {
        const provider = await Provider.findById(criteria)
            .select('_id name');

        if (!provider) {
            throw new ApiError(404, 'Provider not found');
        }

        return JSON.parse(JSON.stringify(provider));
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || error);
    }
};

const edit = async (providerId: any, req: any) => {
    try {
        let provider = await Provider.findByIdAndUpdate(providerId, req.body);

        if (!provider) {
            throw new ApiError(404, 'Provider not found');
        }

        const updatedProvider = await Provider.findById(provider._id)

        return JSON.parse(JSON.stringify(updatedProvider));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const remove = async (providerId: any) => {
    try {
        let provider = await Provider.findByIdAndRemove(providerId);

        if (!provider) {
            throw new ApiError(404, 'Provider not found');
        }

        return JSON.parse(JSON.stringify(provider));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

export default {
    create,
    edit,
    listAll,
    listOne,
    remove
};