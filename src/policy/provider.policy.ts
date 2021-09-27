import Joi from 'joi'

// policy to validate get request for a provider
const getProvider = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

// policy to validate post request for a provider
const addProvider = {
    body: Joi.object().keys({
        name: Joi.string().min(3).required()
    })
};

// policy to validate put request for a provider
const editProvider = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().min(3).required()
    })
};

// policy to validate delete request for a provider
const deleteProvider = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

export default {
    getProvider,
    addProvider,
    editProvider,
    deleteProvider
}
