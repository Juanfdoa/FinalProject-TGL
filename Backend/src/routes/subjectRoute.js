const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectController');
const isAutheticated = require('../middleware/isAutheticated')

router.use(isAutheticated);

router.get('/', subjectController.getSubjects);
router.post('/', subjectController.createSubject);
router.put('/:id', subjectController.updateSubject)
router.delete('/:id', subjectController.deleteSubject);

module.exports = router