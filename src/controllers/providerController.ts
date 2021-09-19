import { Request, Response, NextFunction } from 'express';
import providerService from '../services/providerService';
import catchAsync from '../helpers/catchAsync';
import pick from '../helpers/pick';

const NAMESPACE = 'providerController';

const testCheck = (res: Response) => {
    return res.status(200).json({
        message: 'provider testCheck'
    });
};

const getAllProviders = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['sortBy']);
    const filter = {};
    const providers = await providerService.listAll(options);
    const count = await providerService.count(filter);
    res.status(200).send({
        status: 'success',
        message: 'Providers successfully fetched',
        data: {
            count,
            providers
        }
    });
});

const getProviderByID = catchAsync(async (req: Request, res: Response) => {
    const provider = await providerService.listOne({ _id: req.params.id });

    res.status(200).send({
        status: 'success',
        message: 'Provider successfully fetched',
        data: {
            provider
        }
    });  
});

const createProvider = catchAsync(async (req: Request, res: Response) => {
    const provider = await providerService.create(req);

    res.status(201).send({
        message: 'Provider successfully created',
        provider
    });
});

const updateProvider = catchAsync(async (req: Request, res: Response) => {
    const updatedProvider = await providerService.edit(req.params.id, req);

    res.status(200).send({
        message: 'Provider successfully updated',
        updatedProvider
    });
});

const deleteProvider = catchAsync(async (req: Request, res: Response) => {
    const deletedProvider = await providerService.remove(req.params.id);

    res.status(200).send({
        message: 'Provider successfully deleted'
    });
});

export default {
    testCheck,
    createProvider,
    getAllProviders,
    getProviderByID,
    updateProvider,
    deleteProvider
};