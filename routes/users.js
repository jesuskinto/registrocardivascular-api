const express = require('express');
const { ObjectId } = require('mongodb');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');

const {
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
    const options = { projection: { password: 0 } };
    const userService = new MongoService("users", options);

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
        '/:id',
        validatorHandler({ id: idSchema }, 'params'),
        async function (req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
            const { id } = req.params;
            try {
                const user = await userService.list({ id });
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
                // TODO - mover a nivel de mongo con unique field
                const { email } = user;
                const users = await userService.listAll({ email });
                if (users.length) return res.status(400).json({
                    message: 'email already registered'
                });

                const userId = await userService.create({ payload: user });
                res.status(200).json({
                    data: userId,
                    message: 'user created'
                });
            } catch (error) {
                next(error);
            }
        });

    router.patch(
        '/:id',
        validatorHandler({ id: idSchema }, 'params'),
        validatorHandler(updateUserSchema),
        async function (req, res, next) {
            const { body } = req;
            const { id } = req.params;

            try {
                // TODO - mover a nivel de mongo con unique field
                const { email } = body;
                const users = await userService.listAll({ email, _id: { $ne: ObjectId(id) } });
                if (users.length) return res.status(400).json({
                    message: 'email already registered'
                });


                const user = await userService.update({ body, id });
                res.status(200).json({
                    data: user,
                    message: 'user edited'
                });
            } catch (error) {
                next(error);
            }
        });

    router.delete(
        '/:id',
        validatorHandler({ id: idSchema }, 'params'),
        async function (req, res, next) {
            const { id } = req.params;
            try {
                const userId = await userService.remove({ id })
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