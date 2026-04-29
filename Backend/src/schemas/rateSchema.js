const Joi = require('joi');

const createSchema = Joi.object({
    studentId: Joi.string().guid({ version: 'uuidv4' }).required(),
    subject: Joi.string().required(),
    rate: Joi.number().required(),
    notes: Joi.string()
});

const updateSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().guid({ version: 'uuidv4' }).required()
    }).required(),
    
    body: Joi.object({
        studentId: Joi.string().guid({ version: 'uuidv4' }).required(),
        subject: Joi.string().required(),
        rate: Joi.number().required(),
        notes: Joi.string()
    }).required()      
});

module.exports = {
    createSchema,
    updateSchema
}