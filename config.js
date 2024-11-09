const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbURI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Conectado a la base de datos MongoDB');
  } catch (err) {
    console.error('Error al conectarse:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;