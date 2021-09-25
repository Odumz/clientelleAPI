import Joi from 'joi'

const getClient = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

const addClient = {
    body: Joi.object().keys({
        name: Joi.string().min(3).required().messages({
            'string.empty': `Name cannot be an empty field`,
            'any.required': `Name is a required field`
        }),
        email: Joi.string()
            .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .required()
            .messages({
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`
            }),
        phone: Joi.number()
            .greater(999999999)
            .required()
            .messages({
                'number.empty': `Phone cannot be an empty field`,
                'any.required': `Phone is a required field`
            }),
        provider: Joi.array().items().min(1).required()
    })
};

const editClient = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().min(3),
        phone: Joi.number()
            .greater(9999999999),
        provider: Joi.array().items().min(1).required()
    })
};

const deleteClient = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

export default {
    getClient,
    addClient,
    editClient,
    deleteClient
}
