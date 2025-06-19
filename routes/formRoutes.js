const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/submit', formController.submitForm);
router.post('/enquiry', formController.submitEnquiry);


module.exports = router;