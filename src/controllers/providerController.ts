import { Request, Response, NextFunction } from 'express';
import Provider from '../models/provider';

const NAMESPACE = 'providerController';

const testCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'provider testCheck'
    });
};

const getAllProviders = (req: Request, res: Response, next: NextFunction) => {
    // await Provider.find()
    //     .exec()
    //     .then((providers) => {
    //         return res.status(200).json({
    //             message: 'All providers successfully fetched',
    //             count: providers.length,
    //             providers: providers
    //         });
    //     })
    //     .catch((err) => {
    //         return res.status(500).json({
    //             message: err.message,
    //             err
    //         });
    //     });

    let providers = new Promise<any[]>(resolve => resolve(Provider.find()))

    providers.then(
        (providers) => {
            return res.status(200).json({
                message: 'All providers successfully fetched',
                count: providers.length,
                providers
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

const getProviderByID = (req: Request, res: Response, next: NextFunction) => {
    let provider = new Promise<object>((resolve) => resolve(Provider.findOne({ _id: req.params.id })));
    provider.then(
        (provider) => {
            if (!provider) {
                return res.status(404).json({
                    message: 'Provider does not exist'
                });
            }
            return res.status(200).json({
                message: 'Provider successfully fetched',
                provider
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

// const getOneProvider = (req: Request, res: Response, next: NextFunction) => {
//     await Provider.find()
//         .exec()
//         .then((providers) => {
//             return res.status(200).json({
//                 message: 'All providers successfully fetched',
//                 count: providers.length,
//                 providers: providers
//             });
//         })
//         .catch((err) => {
//             return res.status(500).json({
//                 message: err.message,
//                 err
//             });
//         });
// };

const createProvider = (req: Request, res: Response, next: NextFunction) => {
    let { name } = req.body;

    const provider = new Provider({
        name
    });

    // return provider
    //     .save()
    //     .then((provider) => {
    //         return res.status(201).json({
    //             message: 'Provider successfully created',
    //             provider
    //         });
    //     })
    //     .catch((err) => {
    //         return res.status(500).json({
    //             message: err.message,
    //             err
    //         });
    //     });
    let newProvider = new Promise<object>((resolve) => resolve(provider.save()));

    newProvider.then(
        (provider) => {
            return res.status(201).json({
                message: 'Provider successfully created',
                provider
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

const updateProvider = (req: Request, res: Response, next: NextFunction) => {
    let { name } = req.body;

    let provider = new Promise<object>((resolve) => resolve(Provider.findOneAndUpdate({ _id: req.params.id }, { name })));
    let updatedProvider = new Promise<object>((resolve) => resolve(Provider.findOne({ _id: req.params.id })));
    updatedProvider.then(
        (provider) => {
            if (!provider) {
                return res.status(404).json({
                    message: 'Provider does not exist'
                });
            }
            return res.status(200).json({
                message: 'Provider successfully updated',
                provider
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

const deleteProvider = (req: Request, res: Response, next: NextFunction) => {
    let provider = new Promise<object>((resolve) => resolve(Provider.findOneAndDelete({ _id: req.params.id })));
    provider.then(
        (provider) => {
            if (!provider) {
                return res.status(404).json({
                    message: 'Provider does not exist'
                });
            }
            return res.status(200).json({
                message: 'Provider successfully deleted',
                provider: null
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

// const updateProvider = (req: Request, res: Response, next: NextFunction) => {
//     const { name } = req.body
//     await Provider.findOneAndUpdate({ _id: req.params.id}, { name })
//         .exec()
//         .then((provider) => {
//             Provider.findOne({ _id: req.params.id })
//             return res.status(200).json({
//                 message: 'All providers successfully fetched',
//                 provider
//             });
//         })
//         .catch((err) => {
//             return res.status(500).json({
//                 message: err.message,
//                 err
//             });
//         });
// };

// const deleteProvider = (req: Request, res: Response, next: NextFunction) => {
//     await Provider.find()
//         .exec()
//         .then((providers) => {
//             return res.status(200).json({
//                 message: 'All providers successfully fetched',
//                 count: providers.length,
//                 providers: providers
//             });
//         })
//         .catch((err) => {
//             return res.status(500).json({
//                 message: err.message,
//                 err
//             });
//         });
// };

export default {
    testCheck,
    createProvider,
    getAllProviders,
    getProviderByID,
    updateProvider,
    deleteProvider
};