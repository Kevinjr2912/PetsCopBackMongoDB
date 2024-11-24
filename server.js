const express = require('express');
const connectDB = require('./config');
const dotenv = require('dotenv');
const cors = require('cors');
const Socket = require('socket.io');
const http = require('http');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Socket.Server(server, {
  cors: {
    origin: "*",
  }
});

app.use(express.json());
app.use(cors());

const postRoute = require('./src/routes/Post.route');
const localServiceRoute = require('./src/routes/LocalService.routes');
const commentRoute = require('./src/routes/Comment.route');
const commentToLocalService = require('./src/routes/CommentToLocalService.route');
const driveRoute = require('./src/routes/Drive.route');
const dipomexRoute = require('./src/routes/Dipomex.route');
const socketHandler = require('./src/config/socketHandler');

socketHandler.socketHandler(io);

// Resources
app.use('/posts', postRoute);
app.use('/locals_services', localServiceRoute);
app.use('/comments', commentRoute);
app.use('/commentsToLocalService', commentToLocalService);
app.use('/drive', driveRoute);
app.use('/dipomex', dipomexRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
