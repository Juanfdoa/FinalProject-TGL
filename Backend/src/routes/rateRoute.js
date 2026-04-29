const express = require('express');
const router = express.Router();
const rateController = require('../controller/rateController');
const isAutheticated = require('../middleware/isAutheticated')

router.get('/:studentId', rateController.getStudentRates);

router.use(isAutheticated);

router.post('/', rateController.createRate);
router.put('/:id', rateController.updateRate)
router.delete('/:id', rateController.deleteRate);



module.exports = router