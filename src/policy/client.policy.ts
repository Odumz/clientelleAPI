import Joi from 'joi'

// policy to validate get request for a client
const getClient = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

// policy to validate post request for a client
const addClient = {
    body: Joi.object().keys({
        name: Joi.string().min(3).required(),
        email: Joi.string()
            .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .required(),
        phone: Joi.number()
            .greater(999999999)
            .required(),
        provider: Joi.array().items().min(1).required()
    })
};

// policy to validate put request for a client
const editClient = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().min(3),
        phone: Joi.number().greater(999999999),
        provider: Joi.array().items().min(1).required()
    })
};

// policy to validate delete request for a client
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
