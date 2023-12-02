const express = require('express');
const router = express.Router();
const rateController = require('../controller/rateController');
const isAutheticated = require('../middleware/isAutheticated')

router.get('/:studentId', rateController.getStudentRates);

router.use(isAutheticated);

router.post('/create', rateController.createRate);
router.put('/update', rateController.updateRate)
router.delete('/delete/:id', rateController.deleteRate);



module.exports = router