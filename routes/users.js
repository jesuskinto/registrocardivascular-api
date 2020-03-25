const express = require('express');
const UserService = require('../services/userService');
const {
    userIdSchema,
    createUserSchema,
    updateUserSchema
} = require('../utils/schemas/users');
const validatorHandler = require('../utils/middleware/validatorHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time')


function userApi(app) {
    const router = express.Router();
    app.use('/api/users', router);
    const userService = new UserService();

    router.get('/', async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { query } = req;
        try {
            const users = await userService.listAll(query);
            res.status(200).json({
                data: users,
                message: 'users listed'
            });
        } catch (error) {
            next(error);
        }
    });

    router.get(
        '/:idUser',
        validatorHandler({ idUser: userIdSchema }, 'params'),
        async function (req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
            const { idUser } = req.params;
            try {
                const user = await userService.list({ idUser });
                res.status(200).json({
                    data: user,
                    message: 'user listed'
                });
            } catch (error) {
                next(error);
            }
        });

    router.post(
        '/',
        validatorHandler(createUserSchema),
        async function (req, res, next) {
            const { body: user } = req;

            try {
                const { email } = user;

                // TODO - mover a nivel de mongo con unique field
                const users = await userService.listAll({ email });
                if (users.length) return res.status(400).json({
                    message: 'email already registered'
                });

                const userId = await userService.create({ user });
                res.status(200).json({
                    data: userId,
                    message: 'user created'
                });
            } catch (error) {
                next(error);
            }
        });

    router.patch(
        '/:idUser',
        validatorHandler({ idUser: userIdSchema }, 'params'),
        validatorHandler(updateUserSchema),
        async function (req, res, next) {
            const { body } = req;
            const { idUser } = req.params;

            try {
                const user = await userService.update({ body, idUser });
                res.status(200).json({
                    data: user,
                    message: 'user edited'
                });
            } catch (error) {
                next(error);
            }
        });

    router.delete(
        '/:idUser',
        validatorHandler({ idUser: userIdSchema }, 'params'),
        async function (req, res, next) {
            const { idUser } = req.params;
            try {
                const userId = await userService.remove({ idUser })
                res.status(200).json({
                    data: userId,
                    message: 'user deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = userApi;