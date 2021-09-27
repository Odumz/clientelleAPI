import express from 'express';
import clientRoute from './clientRoute';
import providerRoute from './providerRoute';

const router = express.Router();

router.use('/clients', clientRoute); // use the client routes
router.use('/providers', providerRoute); // use the provider routes

export = router;
