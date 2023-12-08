const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectController');
const isAutheticated = require('../middleware/isAutheticated')

//router.use(isAutheticated);

router.get('/', subjectController.getSubjects);
router.post('/create', subjectController.createSubject);
router.put('/update', subjectController.updateSubject)
router.delete('/delete/:id', subjectController.deleteSubject);

module.exports = router