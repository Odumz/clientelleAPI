import { Request, Response, NextFunction } from 'express';
import providerService from '../services/providerService';
import catchAsync from '../helpers/catchAsync';
import pick from '../helpers/pick';

// test route controller definition
const testCheck = (req: Request, res: Response) => {
    res.status(200).send({
        message: 'provider testCheck'
    });
};

// get all providers with conditions route controller definition
const getAllProviders = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ['sortBy']);
    const filter = pick(req.query, ['name']);
    const providers = await providerService.listAll(options, filter);
    const count = await providers.length;
    res.status(200).send({
        status: 'success',
        message: 'Providers successfully fetched',
        data: {
            count,
            providers
        }
    });
});

// get provider by ID route controller definition
const getProviderByID = catchAsync(async (req: Request, res: Response) => {
    const provider = await providerService.listOne(req.params.id);

    res.status(200).send({
        status: 'success',
        message: 'Provider successfully fetched',
        data: {
            provider
        }
    });  
});

// add a provider route controller definition
const createProvider = catchAsync(async (req: Request, res: Response) => {
    const provider = await providerService.create(req);

    res.status(201).send({
        status: 'success',
        message: 'Provider successfully created',
        provider
    });
});

// update a provider route controller definition
const updateProvider = catchAsync(async (req: Request, res: Response) => {
    const updatedProvider = await providerService.edit(req.params.id, req);

    res.status(200).send({
        status: 'success',
        message: 'Provider successfully updated',
        updatedProvider
    });
});

// delete a provider route controller definition
const deleteProvider = catchAsync(async (req: Request, res: Response) => {
    const deletedProvider = await providerService.remove(req.params.id);

    res.status(200).send({
        status: 'success',
        message: 'Provider successfully deleted'
    });
});

export {
    testCheck,
    createProvider,
    getAllProviders,
    getProviderByID,
    updateProvider,
    deleteProvider
};