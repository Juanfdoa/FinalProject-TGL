const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
const isAutheticated = require('../middleware/isAutheticated')

router.get('/:documentNumber', studentController.getStudent);

router.use(isAutheticated);

router.get('/', studentController.getStudents);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent)
router.delete('/:id', studentController.deleteStudent);



module.exports = router