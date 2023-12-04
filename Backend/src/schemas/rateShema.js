const Joi = require('joi');

const createShema = Joi.object({
    studentId: Joi.number().required(),
    subject: Joi.string().required(),
    rate: Joi.number().required(),
    notes: Joi.string()
});

const updateShema = Joi.object({
    id: Joi.number().required(),
    studentId: Joi.number().required(),
    subject: Joi.string().required(),
    rate: Joi.number().required(),
    notes: Joi.string()
});

module.exports = {
    createShema,
    updateShema
}