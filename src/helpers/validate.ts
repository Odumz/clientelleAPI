import Joi from 'joi'
import ApiError from './ApiError';
import pick from './pick'
import { Request, Response, NextFunction } from 'express'

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", 'query', "body", 'headers']);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: {label: "key"}})
        .validate(object);

    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(", ");

        return next(new ApiError(400, errorMessage));
    }

    Object.assign(req, value)
    return next();
};

export default {
    validate
}