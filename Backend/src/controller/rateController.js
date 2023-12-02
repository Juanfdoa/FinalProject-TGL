const Joi = require('joi');
const rateService = require('../services/rateService')

const getStudentRates= async (req, res) => {
    try 
    {
        const schema = Joi.object({
            studentId: Joi.required()
        });

        const { error } = schema.validate({ studentId: req.params.studentId });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const studentId= req.params.studentId;

        const studentRates = await rateService.getRateByStudent(studentId)
        res.status(200).json(studentRates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRate = async (req, res) => {
    try {
        const schema = Joi.object({
            studentId: Joi.number().required(),
            subject: Joi.string().required(),
            rate: Joi.number().required(),
            notes: Joi.string()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { studentId, subject, rate, notes} = req.body;
        const newRate = await rateService.insertRate(studentId, subject, rate, notes)

        if (!newRate) {
            res.status(404).json({ error: 'Bad request' });
        }
        res.status(201).json(newRate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRate = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
            studentId: Joi.number().required(),
            subject: Joi.string().required(),
            rate: Joi.number().required(),
            notes: Joi.string()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id, studentId, subject, rate, notes} = req.body;
        const updateRate = await rateService.updateRate(id, studentId, subject, rate, notes)

        if (!updateRate) {
            res.status(404).json({ error: 'Bad request' });
        }
        res.status(200).json(updateRate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRate = async (req, res) => {
    try
    {
        const schema = Joi.object({
            id: Joi.required()
        });

        const { error } = schema.validate({ id: req.params.id});
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const id = req.params.id;
        const rateDeleted = await rateService.deleteRate(id);

        if (!rateDeleted) {
            return res.status(404).json({ error: 'Rate was not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getStudentRates,
    createRate,
    updateRate,
    deleteRate
}