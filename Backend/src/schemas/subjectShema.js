const Joi = require('joi');

const createShema = Joi.object({
    name: Joi.string().required(),
    teacher: Joi.string().required(),
});

const updateShema = Joi.object({
    id: Joi.required(),
    name: Joi.string().required(),
    teacher: Joi.string().required()
});

module.exports = {
    createShema,
    updateShema
}