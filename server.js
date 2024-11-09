const express = require('express');
const connectDB = require('./config');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const postRoute = require('./src/routes/Post.route');

// Resources
app.use('/posts', postRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
