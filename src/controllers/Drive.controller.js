const os = require('os');
const path = require('path');
const fs = require('fs');
const stream = require('stream');
const driveService = require('../../configDrive');

// Subir múltiples archivos a Google Drive
exports.uploadToDrive = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron archivos' });
    }

    const uploadedFiles = [];

    try {
        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const fileMetadata = { name: file.originalname };

            const media = {
                mimeType: file.mimetype,
                body: stream.Readable.from(file.buffer),
            };

            const uploadedFile = await driveService.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id',
            });

            uploadedFiles.push(uploadedFile.data.id);
        }

        res.status(200).json(uploadedFiles);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al subir los archivos' });
    }
};

// Ruta para descargar archivo desde Google Drive
exports.downloadFromDrive = async (req, res) => {
    const { fileId } = req.params;

    try {
        const driveFile = await driveService.files.get(
            { fileId: fileId, alt: 'media' },
            { responseType: 'stream' }
        );

        const dataStream = new stream.PassThrough();
        driveFile.data
            .on('end', () => console.log('Descarga completada'))
            .on('error', err => {
                console.error('Error durante la descarga:', err);
                res.status(500).send('Error durante la descarga');
            })
            .pipe(dataStream);

        res.setHeader('Content-Disposition', `filename="${fileId}.jpg"`);
        dataStream.pipe(res);

    } catch (error) {
        res.status(500).json({ error: 'Error al descargar el archivo' });
    }
};
