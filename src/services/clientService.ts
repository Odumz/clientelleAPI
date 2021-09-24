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

const listAll = async (criteria: any = {}, options:any = {}) => {
    try {
        const { sort = { createdAt: 1 }} = options;

        let clients = await Client.find(criteria)
            .sort(sort)
            .select('name email phone provider')
            .populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] });

        return JSON.parse(JSON.stringify(clients));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err)
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
            throw new ApiError(404, 'Client not found')
        }

        return JSON.parse(JSON.stringify(client));
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err)
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
        throw new ApiError(error.statusCode || 500, error.message || 'error')
    }
};

const count = async (criteria: any = {}) => {
    try {
        return await Client.find(criteria).countDocuments();
    } catch (err: any) {
        throw new ApiError(err.statusCode || 500, err.message || err)
    }
};

export default {
    create,
    edit,
    listAll,
    listOne,
    remove,
    count
};