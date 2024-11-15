const express = require('express');
const multer = require('multer');
const { uploadToDrive, downloadFromDrive } = require('../controllers/Drive.controller');

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage()
});

// Ruta para subir un archivo a Google Drive
router.post('/uploadImageProfile', upload.single('file'), uploadToDrive);

// Ruta para descargar un archivo desde Google Drive
router.get('/download/:fileId', downloadFromDrive);

module.exports = router;
