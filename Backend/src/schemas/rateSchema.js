const Joi = require('joi');

const createSchema = Joi.object({
    studentId: Joi.string().guid({ version: 'uuidv4' }).required(),
    subjectId: Joi.string().guid({ version: 'uuidv4' }).required(),
    rate: Joi.number().required(),
    notes: Joi.string()
});

const updateSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().guid({ version: 'uuidv4' }).required()
    }).required(),
    
    body: Joi.object({
        studentId: Joi.string().guid({ version: 'uuidv4' }).required(),
        subjectId: Joi.string().guid({ version: 'uuidv4' }).required(),
        rate: Joi.number().required(),
        notes: Joi.string()
    }).required()      
});

module.exports = {
    createSchema,
    updateSchema
}