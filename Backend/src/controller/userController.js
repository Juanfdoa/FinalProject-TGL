const Joi = require('joi');
const userService = require('../services/userService')
const { successResponse, errorResponse } = require('../Utils/response');

const getUsers= async (req, res) => {
    try {
        const users = await userService.getUsers();
        return successResponse(res, users, 'Users retrieved successfully');
    } catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const createUser = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const { email, password} = req.body;
        const user = await userService.insertUser(email, password)
        if (!user) {
           return errorResponse(res, 'Not found', 404);
        }

        return successResponse(res, user, 'User created successfully', 201);
    } catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
};

const deleteUser = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required()
        });

        const { error } = schema.validate({ id: req.params.id });
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        const id = req.params.id;
        const userDeleted = await userService.deleteUser(id)

        if (!userDeleted) {
            return errorResponse(res, 'Not found', 404);
        }

        return successResponse(res, null, 'User deleted successfully', 204);
    } catch (error) {
        return errorResponse(res, error.message, error.statusCode);
    }
}

module.exports = {
    getUsers,
    createUser,
    deleteUser
}