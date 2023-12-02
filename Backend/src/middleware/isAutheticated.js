const jwt = require('jsonwebtoken')
require('dotenv').config();

function isAutheticated(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            console.error(err);
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.user = payload;
        next();
    });
}

module.exports = isAutheticated;