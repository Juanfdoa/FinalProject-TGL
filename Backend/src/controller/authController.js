const userService = require('../services/userService')
const { authResponse, errorResponse } = require('../Utils/response');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.login(email, password);
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return authResponse(res, user, token);
    } catch (err) {
        return errorResponse(res, err.message, err.status || 401 );
    }
};

module.exports = {
    Login
}