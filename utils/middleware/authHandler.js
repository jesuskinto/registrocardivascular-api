const jwt = require('jsonwebtoken');
function authHanlder(req, res, next) {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) return res.status(400).json({ mensaje: 'Token inválida' });
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else res.status(400).send({ mensaje: 'Token no proveída.' });
}

module.exports = authHanlder;