const express = require('express');
const router = express.Router();
const { registerLocalService, getInformationLocalService, getInformationAllLocalsAndServices, updateInformationLocalOrService,deleteLocalOrService } = require('../controllers/LocalService.controller');

// Route to create a local or service
router.post('/registerLocalService', registerLocalService);

// Route to get information fo a local or service
router.post('/getInformationLocalService/:id_local_service', getInformationLocalService)

// Route to get all locals and services
router.get('/getAllLocalsServices', getInformationAllLocalsAndServices);

// Route to update information about a location o service
router.put('/updateInformationLocalService/:id_local_service', updateInformationLocalOrService);

// Route to delete a local o service of the system
router.delete('/deleteLocalOrService/:id_local_service', deleteLocalOrService);

module.exports = router;