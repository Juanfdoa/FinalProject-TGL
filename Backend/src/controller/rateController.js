const Joi = require('joi');
const rateService = require('../services/rateService')
const {createSchema,updateSchema} = require('../schemas/rateSchema')
const { successResponse, errorResponse } = require('../Utils/response');

const getStudentRates= async (req, res) => {
    try 
    {
        const schema = Joi.object({
            studentId: Joi.string().guid({ version: 'uuidv4' }).required()
        });

        const { error } = schema.validate({ studentId: req.params.studentId });
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const studentId= req.params.studentId;
        const studentRates = await rateService.getRateByStudent(studentId)
        return successResponse(res, studentRates, 'Rates retrieved successfully');
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const createRate = async (req, res) => {
    try {
        const { error } = createSchema.validate(req.body);
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const { studentId, subject, rate, notes} = req.body;
        const newRate = await rateService.insertRate(studentId, subject, rate, notes)
        return successResponse(res, newRate, 'Rate created successfully', 201);
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const updateRate = async (req, res) => {
    try 
    {
        const { error } = updateSchema.validate({
            params: req.params,
            body: req.body
        });

        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const {id} = req.params;
        const {studentId, subject, rate, notes} = req.body;
        const updateRate = await rateService.updateRate(id, studentId, subject, rate, notes)
        return successResponse(res, updateRate, "Rate updated successfully")
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const deleteRate = async (req, res) => {
    try
    {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required()
        });

        const { error } = schema.validate({ id: req.params.id});
        if (error) {
           return errorResponse(res, error.details[0].message, 400);
        }

        const id = req.params.id;
        await rateService.deleteRate(id);
        return successResponse(res, null, 'Rate deleted successfully', 204);
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
}

module.exports = {
    getStudentRates,
    createRate,
    updateRate,
    deleteRate
}