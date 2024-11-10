const express = require('express');
const router = express.Router();
const { registerLocalService, getInformationLocalService } = require('../controllers/LocalService.controller');

// Route to create a local or service
router.post('/registerLocalService', registerLocalService);

// Route to get information fo a local or service
router.post('/getInformationLocalService/:id_local_service', getInformationLocalService)

module.exports = router;