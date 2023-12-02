const userService = require('../services/userService')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.login(email, password);
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)
        res.send(`Token: ${token}`)
    } catch (err) {
        res.status(401).send('Invalid Credentials')
    }
};



module.exports = {
    Login
}