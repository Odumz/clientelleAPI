import express from 'express';
import clientRoute from './clientRoute';
import providerRoute from './providerRoute';

const router = express.Router();

router.use('/clients', clientRoute);
router.use('/providers', providerRoute);

export = router;
