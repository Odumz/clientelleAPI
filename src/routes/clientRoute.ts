import { Router } from 'express';
import { testCheck, getAllClients, createClient, getClientByID, updateClient, deleteClient } from '../controllers/clientController';
import clientValidation from '../policy/client.policy';
import validate from '../helpers/validate';

const router: Router = Router();

router.get('/ping', testCheck); // test route

router.get('/all', getAllClients); // get all clients with conditions

router.get('/:id', validate.validate(clientValidation.getClient), getClientByID); // get a client by ID

router.post('/add', validate.validate(clientValidation.addClient), createClient); // add a client to the database

router.put('/edit/:id', validate.validate(clientValidation.editClient), updateClient); // edit a client in the database

router.delete('/delete/:id', validate.validate(clientValidation.deleteClient), deleteClient); // delete a client in the database

export = router;
