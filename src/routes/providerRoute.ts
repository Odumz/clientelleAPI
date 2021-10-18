import express from 'express';
import { testCheck, createProvider, getAllProviders, getProviderByID, updateProvider, deleteProvider } from '../controllers/providerController';
import providerValidation from '../policy/provider.policy';
import validate from '../helpers/validate';

const router = express.Router();

router.get('/ping', testCheck); // test route

router.get('/all', getAllProviders); // get all providers with conditions

router.get('/:id', validate.validate(providerValidation.getProvider), getProviderByID); // get one provider by ID

router.post('/add', validate.validate(providerValidation.addProvider), createProvider); // add a provider to the database

router.put('/edit/:id', validate.validate(providerValidation.editProvider), updateProvider); // edit a provider in the database

router.delete('/delete/:id', validate.validate(providerValidation.deleteProvider), deleteProvider); // delete a provider from the providers

export = router;
