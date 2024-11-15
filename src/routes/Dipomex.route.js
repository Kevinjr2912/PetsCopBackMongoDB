const express = require('express');
const router = express.Router();
const { getInformationAddress } = require('../controllers/Dipomex.controller');

router.post('/:codigo_postal', getInformationAddress);

module.exports = router;