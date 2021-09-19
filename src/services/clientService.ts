import ApiError from '../helpers/ApiError';
import { Request, Response } from 'express';
import Client from '../models/client'

const create = async (req: Request) => {
    try {
        const data = req.body;

        const client = await Client.create(data);

        return JSON.parse(JSON.stringify(client));
    } catch (err: any) {
        throw new ApiError(err.code || 500, err.message || err);
    }
};

const listAll = async (criteria: any = {}, options:any = {}) => {
    const { sort = { createdAt: -1 }} = options;

    let clients = await Client.find(criteria)
        .sort(sort)
        .select('name email phone provider')
        .populate({ path: 'provider', model: 'provider', select: ['_id'] });

    return clients
};

const listOne = async (criteria: any) => {
    try {
        console.log(criteria);
        
        const client = await Client.findOne(criteria)
            .select('name email phone provider')
            .populate({ path: 'provider', model: 'provider', select: ['_id'] });

        if (!client) {
            throw new ApiError(404, 'Client not found');
        }

        return JSON.parse(JSON.stringify(client));
    } catch (error: any) {
        throw new ApiError(error.code || 500, error.message || error);
    }
};

const edit = async (clientId: any, req: any) => {
    let client = await Client.findById(clientId);

    if (!client) {
        throw new ApiError(404, 'Client not found')
    }

    let data = req.body;

    Object.assign(client, data);
    await client.save();
    return client;
};

const remove = async (clientId: any) => {
    let client = await Client.findById(clientId);

    if (!client) {
        throw new ApiError(404, 'Client not found');
    }
    
    const deletedClient = await Client.findOneAndDelete(clientId)
    return deletedClient;
};

const count = async (criteria: any = {}) => {
    return await Client.find(criteria).countDocuments();
};

export default {
    create,
    edit,
    listAll,
    listOne,
    remove,
    count
};