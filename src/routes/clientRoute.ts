import express from 'express';
import controller from '../controllers/clientController';
import clientValidation from '../policy/client.policy';
import validate from '../helpers/validate';

const router = express.Router();

router.get('/ping', controller.testCheck);

router.get('/all', controller.getAllClients);

router.get('/:id', controller.getClientByID);

router.post('/add', validate.validate(clientValidation.addClient), controller.createClient);

router.put('/edit/:id', validate.validate(clientValidation.editClient), controller.updateClient);

router.delete('/delete/:id', controller.deleteClient);

export = router;
