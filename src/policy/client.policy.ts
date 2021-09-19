import Joi from 'joi'

// const addClient = (data: object) => {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required(),
//         email: Joi.string()
//             .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
//             .required(),
//         phone: Joi.number().min(10).required(),
//         provider: Joi.array().items({ providers: Joi.string().required() })
//     });

//     const {value, error} = schema.validate(data);
//     console.log('value is ', value);
//     console.log('error is ', error);
    
//     // return schema.validate(data);
// }

// const editClient = (data: object) => {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required(),
//         email: Joi.string()
//             .pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
//             .required(),
//         phone: Joi.number().min(10).required(),
//         provider: Joi.array().items({ providers: Joi.string().required() })
//     });

//     return schema.validate(data);
// };

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
        phone: Joi.string()
            .min(10)
            .pattern(/^[0-9]+$/)
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
        phone: Joi.string()
            .min(10)
            .pattern(/^[0-9]+$/),
        provider: Joi.array().items().min(1).required()
    })
};

export default {
    addClient,
    editClient
}
