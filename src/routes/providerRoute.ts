import express from 'express';
import controller from '../controllers/providerController';
import providerValidation from '../policy/provider.policy';
import validate from '../helpers/validate';

const router = express.Router();

router.get('/ping', controller.testCheck); // test route

router.get('/all', controller.getAllProviders); // get all providers with conditions

router.get('/:id', validate.validate(providerValidation.getProvider), controller.getProviderByID); // get one provider by ID

router.post('/add', validate.validate(providerValidation.addProvider), controller.createProvider); // add a provider to the database

router.put('/edit/:id', validate.validate(providerValidation.editProvider), controller.updateProvider); // edit a provider in the database

router.delete('/delete/:id', validate.validate(providerValidation.deleteProvider), controller.deleteProvider); // delete a provider from the providers

export = router;
