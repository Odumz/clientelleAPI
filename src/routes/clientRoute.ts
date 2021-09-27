import express from 'express';
import controller from '../controllers/clientController';
import clientValidation from '../policy/client.policy';
import validate from '../helpers/validate';

const router = express.Router();

router.get('/ping', controller.testCheck); // test route

router.get('/all', controller.getAllClients); // get all clients with conditions

router.get('/:id', validate.validate(clientValidation.getClient), controller.getClientByID); // get a client by ID

router.post('/add', validate.validate(clientValidation.addClient), controller.createClient); // add a client to the database

router.put('/edit/:id', validate.validate(clientValidation.editClient), controller.updateClient); // edit a client in the database

router.delete('/delete/:id', validate.validate(clientValidation.deleteClient), controller.deleteClient); // delete a client in the database

export = router;
