const express = require('express');
const router = express.Router();
const { registerLocalService, getInformationLocalService, getNameAndPhotoLocalService,getInformationAllLocalsAndServices, updateInformationLocalOrService,deleteLocalOrService, getLocalServicesByIdUser } = require('../controllers/LocalService.controller');

// Route to create a local or service
router.post('/registerLocalService', registerLocalService);

// Route to get information fo a local or service
router.post('/getInformationLocalService/:id_local_service', getInformationLocalService);

router.post('/getNameAndPhotolocalService/:id_user', getNameAndPhotoLocalService);

// Route to get all locals and services
router.get('/getAllLocalsServices', getInformationAllLocalsAndServices);

// Route to get a Local o service by id of a user
router.get('/get_by_id_user/:id_user', getLocalServicesByIdUser);

// Route to update information about a location o service
router.put('/updateInformationLocalService/:id_local_service', updateInformationLocalOrService);

// Route to delete a local o service of the system
router.delete('/deleteLocalOrService/:id_local_service', deleteLocalOrService);

module.exports = router;