const Joi = require('joi');

const createSchema = Joi.object({
    name: Joi.string().required(),
    teacher: Joi.string().required(),
});

const updateSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().guid({ version: 'uuidv4' }).required()
    }).required(),

    body: Joi.object({
        name: Joi.string().required(),
        teacher: Joi.string().required()
    }).required()      
});

module.exports = {
    createSchema,
    updateSchema
}