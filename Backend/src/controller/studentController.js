const Joi = require('joi');
const studentService = require('../services/studentService')
const {createSchema, updateSchema} = require('../schemas/studentSchema')
const { successResponse, errorResponse } = require('../Utils/response');

const getStudents= async (req, res) => {
    try 
    {
        const students = await studentService.getStudents()
        return successResponse(res, students, 'Students retrieved successfully');
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const getStudent= async (req, res) => {
    try 
    {
        const schema = Joi.object({
            documentNumber: Joi.required()
        });

        const { error } = schema.validate({ documentNumber: req.params.documentNumber });
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const document = req.params.documentNumber;
        const student = await studentService.getStudentByDocument(document)
        return successResponse(res, student, 'Student retrieved successfully');
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const createStudent = async (req, res) => {
    try 
    {
        const { error } = createSchema.validate(req.body);
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const { name, surname, documentNumber, telephone} = req.body;
        const student = await studentService.insertStudent(name, surname, documentNumber, telephone)
        return successResponse(res, student, 'Student Created successfully', 201);
    } catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const updateStudent = async (req, res) => {
    try 
    {
        const { error } = updateSchema.validate({
            params: req.params,
            body: req.body
        });

        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const { id } = req.params;
        const { name, surname, documentNumber, telephone } = req.body;
        const student = await studentService.updateStudent(id,name,surname,documentNumber,telephone);
        return successResponse(res, student, 'Student Updated successfully');
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const deleteStudent = async (req, res) => {
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
        await studentService.deleteStudent(id);
        return successResponse(res, null, 'Student deleted successfully', 204);
    } 
    catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
}

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}