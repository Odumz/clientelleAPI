import express from 'express';
import controller from '../controllers/clientController';

const router = express.Router();

router.get('/ping', controller.testCheck);

router.get('/', controller.getAllClients);

router.get('/:id', controller.getClientByID);

router.post('/add', controller.createClient);

export = router;
