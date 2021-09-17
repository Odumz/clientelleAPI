import express from 'express';
import controller from '../controllers/providerController';

const router = express.Router();

router.get('/ping', controller.testCheck);

router.get('/', controller.getAllProviders);

router.get('/:id', controller.getProviderByID);

router.post('/add', controller.createProvider);

router.put('/edit/:id', controller.updateProvider);

router.delete('/delete/:id', controller.deleteProvider);

export = router;
