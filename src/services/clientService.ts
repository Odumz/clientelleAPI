import ApiError from '../helpers/ApiError'
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
}

const listAll = async (criteria: any = {}, options:any = {}) => {
    
}

const edit = {}

export default {
    create
};