const { successResponse, errorResponse } = require('../Utils/response');
const jwt = require('jsonwebtoken')
require('dotenv').config();

function isAutheticated(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return errorResponse(res, 'Unauthorized: Token is missing', 401);
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            console.error('Error verifying token:', err);
            return errorResponse(res, 'Forbidden: Invalid token', 403);
        }
        req.user = payload;
        next();
    });
}

module.exports = isAutheticated;