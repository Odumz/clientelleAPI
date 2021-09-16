import express from 'express';
import controller from '../controllers/providerController';

const router = express.Router();

router.get('/ping', controller.testCheck);

export = router;
