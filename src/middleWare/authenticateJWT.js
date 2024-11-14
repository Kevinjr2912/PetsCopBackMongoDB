const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const jwt_secret = process.env.SECRET;

module.exports = authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, jwt_secret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
}