import { Request, Response, NextFunction } from 'express';
import Client from '../models/client';

const NAMESPACE = 'clientController';

const testCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'client testCheck'
    });
};

const getAllClients = async (req: Request, res: Response, next: NextFunction) => {
    // await Client.find()
    //     .populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] })
    //     .exec()
    //     .then((clients) => {
    //         return res.status(200).json({
    //             message: 'All clients successfully fetched',
    //             count: clients.length,
    //             clients: clients
    //         });
    //     })
    //     .catch((err) => {
    //         return res.status(500).json({
    //             message: err.message,
    //             err
    //         });
    //     });
    let clients = new Promise<any[]>((resolve) => resolve(Client.find().populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] })));

    clients.then(
        (clients) => {
            return res.status(200).json({
                message: 'All clients successfully fetched',
                count: clients.length,
                clients
            });
        },
        (err) => {
            return res.status(500).json({
                message: err.message,
                err
            });
        }
    );
};

const getClientByID = async (req: Request, res: Response, next: NextFunction) => {
    await Client.findOne({ _id: req.params.id })
        .populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] })
        .exec()
        .then((client) => {
            return res.status(200).json({
                message: 'Client successfully fetched',
                client
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            });
        });
};

const createClient = (req: Request, res: Response, next: NextFunction) => {
    let { name, email, phone, provider } = req.body;

    const client = new Client({
        name,
        email,
        phone,
        provider
    })

    return client
        .save()
        .then((client) => {
            return res.status(201).json({
                message: 'Client successfully created',
                client
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            });
        });
};

export default { 
    testCheck,
    getAllClients,
    createClient,
    getClientByID
};
