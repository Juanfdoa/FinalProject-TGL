const Joi = require('joi');
const subjectService = require('../services/subjectService')

const getSubjects= async (req, res) => {
    try {
        const subjects = await subjectService.getSubjects()
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSubject = async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            teacher: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, teacher} = req.body;
        const subject = await subjectService.insertSubject(name, teacher)

        if (!subject) {
            res.status(404).json({ error: 'Bad request' });
        }
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSubject = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.required(),
            name: Joi.string().required(),
            teacher: Joi.string().required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const {id, name, teacher} = req.body;
        const subject = await subjectService.updateSubject(id, name, teacher)

        if (!subject) {
            res.status(404).json({ error: 'Bad request' });
        }
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSubject = async (req, res) => {
    try
    {
        const schema = Joi.object({
            id: Joi.required()
        });

        const { error } = schema.validate({ id: req.params.id });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const id = req.params.id;
        const subjectDeleted = await subjectService.deleteSubject(id);

        if (!subjectDeleted) {
            return res.status(404).json({ error: 'Subject was not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject
}