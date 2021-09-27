import { Request, Response, NextFunction } from 'express';
import clientService from '../services/clientService';
import catchAsync from '../helpers/catchAsync';
import pick from '../helpers/pick';

// test route controller definition
const testCheck = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'client testCheck'
    });
};

// get all clients with conditions route controller definition
const getAllClients = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['sortBy']);
    const filter = pick(req.query, ['name', 'email', 'phone']);
    const clients = await clientService.listAll(options, filter);
    const count = await clients.length;
    res.status(200).send({
        status: 'success',
        message: 'Clients successfully fetched',
        data: {
            count,
            clients
        }
    });
});

// get client by ID route controller definition
const getClientByID = catchAsync(async (req: Request, res: Response) => {
    const client = await clientService.listOne(req.params.id);

    res.status(200).send({
        status: 'success',
        message: 'Client successfully fetched',
        data: {
            client
        }
    });
});

// add a client route controller definition
const createClient = catchAsync(async (req: Request, res: Response) => {
    const client = await clientService.create(req);

    res.status(201).send({
        message: 'Client successfully created',
        client
    });
});

// update a client route controller definition
const updateClient = catchAsync(async (req: Request, res: Response) => {
    const updatedClient = await clientService.edit(req.params.id, req);

    res.status(200).send({
        message: 'Client successfully updated',
        updatedClient
    });
});

// delete a client route controller definition
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
