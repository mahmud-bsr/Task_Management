const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ error: 'Token not provided' });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Login Terlebih Dahulu' });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;
