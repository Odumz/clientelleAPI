import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'clientController';

const testCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'provider testCheck route called');

    return res.status(200).json({
        message: 'provider testCheck'
    });
};

export default { testCheck };
