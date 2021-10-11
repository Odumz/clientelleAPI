import ApiError from '../helpers/ApiError';
import { Request } from 'express';
import Client from '../models/client';

const create = async (req: Request) => {
    try {
        const data = req.body;

        const existingClient = await Client.findOne({ email: data.email });

        if (existingClient) {
            throw new ApiError(409, 'Client with this email exists');
        }

        const client = await Client.create(data);

        return JSON.parse(JSON.stringify(client));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const listAll = async (options: any = {}, criteria: any = {}) => {
    try {
        let sorter:number = -1;
        let sortOption:any = {};

        // sort results with sort option
        if (options.sortBy) {
            const parts = options.sortBy.split(':');
            sorter = parts[1] === 'asc' ? 1 : 'desc' ? -1 : 1;
            parts[0] === 'name'
                ? (sortOption = { name: sorter })
                : parts[0] === 'email'
                ? (sortOption = { email: sorter })
                : parts[0] === 'phone'
                ? (sortOption = { phone: sorter })
                : (sortOption = { createdAt: sorter });
        }

        if (criteria.name) {
            const newQuery = criteria.name.split(',') || [];
            criteria = { name: { $in: newQuery } };
        }

        if (criteria.phone) {
            const newQuery = criteria.phone.split(',') || [];
            criteria = { phone: { $in: newQuery } };
        }

        if (criteria.email) {
            const newQuery = criteria.email.split(',') || [];
            criteria = { email: { $in: newQuery } };
        }

        const { sort = sortOption } = options

        let clients = await Client.find(criteria)
            .sort(sort)
            .select('name email phone provider')
            .populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] });

        return JSON.parse(JSON.stringify(clients));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const listOne = async (criteria: string) => {
    try {
        const client = await Client.findById(criteria)
            .select('name email phone provider')
            .populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] });

        if (!client) {
            throw new ApiError(404, 'Client not found');
        }

        return JSON.parse(JSON.stringify(client));
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || error);
    }
};

const edit = async (clientId: string, req: any) => {
    try {
        let client = await Client.findByIdAndUpdate(clientId, req.body);

        if (!client) {
            throw new ApiError(404, 'Client not found');
        }

        const updatedClient = await Client.findById(client._id);

        return JSON.parse(JSON.stringify(updatedClient));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err);
    }
};

const remove = async (clientId: string) => {
    try {
        let client = await Client.findByIdAndRemove(clientId);

        if (!client) {
            throw new ApiError(404, 'Client not found');
        }

        return JSON.parse(JSON.stringify(client));
    } catch (error: any) {
        throw new ApiError(error.statusCode || 500, error.message || 'error');
    }
};

export default {
    create,
    edit,
    listAll,
    listOne,
    remove
};
