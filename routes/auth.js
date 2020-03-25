const express = require('express');
const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');
const validatorHandler = require('../utils/middleware/validatorHandler');
const { authSchema } = require('../utils/schemas/users');

const userService = new UserService();

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

                const token = jwt.sign({ data: user }, password, { expiresIn: 1440 });
                res.status(200).json({
                    token: token,
                    message: 'Autenticación correcta',
                });
            } catch (error) {
                next(error);
            }
        });

}

module.exports = authApi;