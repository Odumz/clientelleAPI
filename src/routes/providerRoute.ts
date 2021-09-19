import express from 'express';
import controller from '../controllers/providerController';
import providerValidation from '../policy/provider.policy';
import validate from '../helpers/validate';

const router = express.Router();

router.get('/ping', controller.testCheck);

router.get('/', controller.getAllProviders);

router.get('/:id', validate.validate(providerValidation.getProvider), controller.getProviderByID);

router.post('/add', validate.validate(providerValidation.addProvider), controller.createProvider);

router.put('/edit/:id', validate.validate(providerValidation.editProvider), controller.updateProvider);

router.delete('/delete/:id', validate.validate(providerValidation.deleteProvider), controller.deleteProvider);

export = router;
