import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';

const NAMESPACE = 'clientController';

const testChecker = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'client testCheck route called');

    return res.status(200).json({
        message: 'client testCheck'
    });
};

export default { testChecker };
