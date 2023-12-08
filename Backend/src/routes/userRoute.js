const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const isAutheticated = require('../middleware/isAutheticated')

router.post('/create', userController.createUser);

router.use(isAutheticated);

router.get('/', userController.getUsers)
router.delete('/:email', userController.deleteUser);



module.exports = router