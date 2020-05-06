const express = require('express');
const jwt = require('jsonwebtoken');
const MongoService = require('../services/mongoService');
const validatorHandler = require('../utils/middleware/validatorHandler');
const { authSchema } = require('../utils/schemas/users');
const { config } = require('../config');
const KEY = config.key;

const userService = new MongoService("users");

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);

    router.post(
        '/',
        validatorHandler(authSchema),
        async function (req, res, next) {
            const { email, password } = req.body;

            try {
                const user = await userService.auth({ email });
                if (!user) return res.status(400).json({
                    message: 'El correo no se encuetra registrado',
                })

                if (user.password !== password) return res.status(400).json({
                    message: 'La contraseña no coinside con el correo',
                })

                const token = jwt.sign({ data: user }, KEY);
                res.status(200).json({
                    token: token,
                    message: 'Autenticación correcta'
                });
            } catch (error) {
                next(error);
            }
        });

}

module.exports = authApi;