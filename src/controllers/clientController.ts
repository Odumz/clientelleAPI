import { Request, Response, NextFunction } from 'express';
import Client from '../models/client';

// interface Client {
//     _id: Number;
//     name: String;
//     email: String;
//     phone: Number;
//     provider: Array<object>;
// }

const testCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'client testCheck'
    });
};

const getAllClients = (req: Request, res: Response, next: NextFunction) => {
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

    // ---------------------------------------------------------------------------------------------------------------------

    // let clients = new Promise<Client[]>((resolve) => resolve(Client.find().populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] })));
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

    // ---------------------------------------------------------------------------------------------------------------------
    
    // let clients: Array<Client> = await Client.find().populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] });
    // let clients: [Client] = result.client;
    // console.log(result);
    // return res.status(200).json({
    //     message: 'All clients successfully fetched',
    //     count: clients.length,
    //     clients
    // });
};

const getClientByID = (req: Request, res: Response, next: NextFunction) => {
    let client = new Promise<object>((resolve) => resolve(Client.findOne({ _id: req.params.id }).populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] })));
    // await Client.findOne({ _id: req.params.id })
    //     .populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] })
    //     .exec()
    client
        .then(
            (client) => {
            if (!client) {
                return res.status(404).json({
                    message: 'Client does not exist'
                });
            }
                return res.status(200).json({
                    message: 'Client successfully fetched',
                    client
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

const createClient = (req: Request, res: Response, next: NextFunction) => {
    let { name, email, phone, provider } = req.body;

    const client = new Client({
        name,
        email,
        phone,
        provider
    })

    let newClient = new Promise<object>((resolve) => resolve(client.save()));

    newClient
        .then(
            (client) => {
                return res.status(201).json({
                    message: 'Client successfully created',
                    client
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

const updateClient = (req: Request, res: Response, next: NextFunction) => {
    let { name, email, phone, provider } = req.body;

    let client = new Promise<object>((resolve) => 
        resolve(
            Client.findOneAndUpdate({ _id: req.params.id }, { name, email, phone, provider })
        )
    );
    let updatedClient = new Promise<object>((resolve) =>
        resolve(
            Client.findOne({ _id: req.params.id })
                .populate({ path: 'provider', model: 'provider', select: ['_id', 'name'] })
        )
    );
    updatedClient.then(
        (client) => {
            if (!client) {
                return res.status(404).json({
                    message: 'Client does not exist'
                });
            }
            return res.status(200).json({
                message: 'Client successfully updated',
                client
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

const deleteClient = (req: Request, res: Response, next: NextFunction) => {    
    let client = new Promise<object>((resolve) => resolve(Client.findOneAndDelete({ _id: req.params.id })));
    client.then(
        (client) => {
            if (!client) {
                return res.status(404).json({
                    message: 'Client does not exist'
                })
            }
            return res.status(200).json({
                message: 'Client successfully deleted',
                client: null
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

export default { 
    testCheck,
    getAllClients,
    createClient,
    getClientByID,
    updateClient,
    deleteClient
};
