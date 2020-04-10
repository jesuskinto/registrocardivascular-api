const { config } = require('../../config');
const KEY = config.key;

const jwt = require('jsonwebtoken');
function authHanlder(req, res, next) {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, KEY, (err, decoded) => {
            if (err) return res.status(400).json({
                statusCode: 400,
                error: "Bad Request",
                message: "Token invalid",
                stack: "AccessError: \"access-token\" is invalid or expired"
            });
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else res.status(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Token is not provider",
        stack: "AccessError: \"access-token\" is required in Headers"
    });
}

module.exports = authHanlder;