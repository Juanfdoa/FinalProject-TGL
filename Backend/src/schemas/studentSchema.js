const Joi = require('joi');

const createSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string(),
    documentNumber: Joi.string().required(),
    telephone: Joi.string().required(),
});

const updateSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().guid({ version: 'uuidv4' }).required()
    }).required(),

    body: Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().allow('', null),
        documentNumber: Joi.string().required(),
        telephone: Joi.string().required()
    }).required() 
});

module.exports = {
    createSchema,
    updateSchema
}