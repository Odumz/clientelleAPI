import express from 'express';
import controller from '../controllers/clientController';

const router = express.Router();

router.get('/ping', controller.testChecker);

export = router;
