const Joi = require('joi');
const subjectService = require('../services/subjectService')
const {createSchema,updateSchema} = require('../schemas/subjectSchema')
const { successResponse, errorResponse } = require('../Utils/response');

const getSubjects= async (req, res) => {
    try 
    {
        const subjects = await subjectService.getSubjects()
        return successResponse(res, subjects, 'Subjects retrieved successfully');
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const createSubject = async (req, res) => {
    try {
        const { error } = createSchema.validate(req.body);
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const { name, teacher} = req.body;
        const subject = await subjectService.insertSubject(name, teacher)
        return successResponse(res, subject, 'Subject Created successfully', 201);
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const updateSubject = async (req, res) => {
    try {
        const { error } = updateSchema.validate({
            params: req.params,
            body: req.body
        });

        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const { id } = req.params;
        const {name, teacher} = req.body;
        const subject = await subjectService.updateSubject(id, name, teacher)
        return successResponse(res, subject, 'Subject updated successfully');
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const deleteSubject = async (req, res) => {
    try
    {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required()
        });

        const { error } = schema.validate({ id: req.params.id });
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const id = req.params.id;
        await subjectService.deleteSubject(id);
        return successResponse(res, null, 'Subject deleted successfully', 204);
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
}

module.exports = {
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject
}