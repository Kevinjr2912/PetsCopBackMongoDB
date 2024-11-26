const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token inválido o expirado" });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ message: "Autorización requerida" });
    }
};


module.exports = authenticateJWT;