const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
const isAutheticated = require('../middleware/isAutheticated')

router.get('/:documentNumber', studentController.getStudent);

//router.use(isAutheticated);

router.get('/', studentController.getStudents);
router.post('/create', studentController.createStudent);
router.put('/update', studentController.updateStudent)
router.delete('/delete/:id', studentController.deleteStudent);



module.exports = router