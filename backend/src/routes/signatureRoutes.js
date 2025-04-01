const express = require('express');
const { generateSignature, checkSignatureStatus } = require('../controllers/signatureController');

const router = express.Router();

router.post('/generate', generateSignature);
router.get('/status/:id', checkSignatureStatus);

module.exports = router; 