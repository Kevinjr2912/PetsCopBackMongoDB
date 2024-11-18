const express = require('express');
const multer = require('multer');
const { uploadToDrive, downloadFromDrive } = require('../controllers/Drive.controller');
const router = express.Router();

// Configuración de multer para manejar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para subir múltiples archivos a Google Drive
router.post('/uploadImages', upload.array('files', 5), uploadToDrive);

// Ruta para descargar un archivo desde Google Drive
router.get('/download/:fileId', downloadFromDrive);

module.exports = router;
