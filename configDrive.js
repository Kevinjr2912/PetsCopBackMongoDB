const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de Google Drive
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const SERVICE_ACCOUNT_FILE = process.env.GOOGLE_CREDENTIALS_PATH;

// Cargar las credenciales de la cuenta de servicio
const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: SCOPES,
});

const driveService = google.drive({ version: 'v3', auth });

module.exports = driveService;