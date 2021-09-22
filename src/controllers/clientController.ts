import { Request, Response, NextFunction } from 'express';
import clientService from '../services/clientService';
import catchAsync from '../helpers/catchAsync';
import pick from '../helpers/pick';

const testCheck = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'client testCheck'
    });
};

const getAllClients = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['sortBy']);
    const filter = {};
    const clients = await clientService.listAll(options);
    const count = await clientService.count(filter);
    res.status(200).send({
        status: 'success',
        message: 'Clients successfully fetched',
        data: {
            count,
            clients
        }
    });
});

const getClientByID = catchAsync(async (req: Request, res: Response) => {
    const client = await clientService.listOne({ _id: req.params.id });

    res.status(200).send({
        status: 'success',
        message: 'Client successfully fetched',
        data: {
            client
        }
    });
});

const createClient = catchAsync(async (req: Request, res: Response) => {
    const client = await clientService.create(req);

    res.status(201).send({
        message: 'Client successfully created',
        client
    });
});

const updateClient = catchAsync(async (req: Request, res: Response) => {
    const updatedClient = await clientService.edit(req.params.id, req);

    res.status(200).send({
        message: 'Client successfully updated',
        updatedClient
    });
});

const deleteClient = catchAsync(async (req: Request, res: Response) => {
    const deletedClient = await clientService.remove(req.params.id);

    res.status(200).send({
        message: 'Client successfully deleted'
    });
});

export default {
    testCheck,
    getAllClients,
    createClient,
    getClientByID,
    updateClient,
    deleteClient
};
