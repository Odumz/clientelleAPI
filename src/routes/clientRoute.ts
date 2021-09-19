import express from 'express';
import controller from '../controllers/clientController';
import addValidation from '../policy/client.policy';
import validate from '../helpers/validate';

const router = express.Router();

router.get('/ping', controller.testCheck);

router.get('/', controller.getAllClients);

router.get('/:id', controller.getClientByID);

router.post('/add', validate.validate(addValidation.addClient), controller.createClient);

router.put('/edit/:id', controller.updateClient);

router.delete('/delete/:id', controller.deleteClient);

export = router;
