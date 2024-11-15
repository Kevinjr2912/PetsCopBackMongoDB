const os = require('os');
const path = require('path');
const fs = require('fs');
const stream = require('stream');
const driveService = require('../../configDrive');

// Subir archivo a Google Drive
exports.uploadToDrive = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se proporcionó un archivo' });
    }

    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, req.file.originalname);

    try {
        fs.writeFileSync(filePath, req.file.buffer);

        const fileMetadata = { name: req.file.originalname };

        const media = {
            mimeType: req.file.mimetype,
            body: fs.createReadStream(filePath),
        };

        const uploadedFile = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });

        const fileId = uploadedFile.data.id;
 
        fs.unlinkSync(filePath);

        res.status(200).json({ fileId });
    } catch (error) {
        res.status(500).json({ error: 'Error al subir el archivo' });
    }
};

// Descargar archivo de Google Drive
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
