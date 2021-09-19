import Joi from 'joi'

const getProvider = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    })
};

const addProvider = {
    body: Joi.object().keys({
        name: Joi.string().min(3).required().messages({
            'string.empty': `Name cannot be an empty field`,
            'any.required': `Name is a required field`
        })
    })
};

const editProvider = {
    params: Joi.object().keys({
        id: Joi.string().alphanum().length(24).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().min(3).required()
    })
};

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
