const express = require('express');
const { ObjectId } = require('mongodb');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');

const {
    createUserSchema,
    updateUserSchema
} = require('../utils/schemas/users');
const validatorHandler = require('../utils/middleware/validatorHandler');
const authHanlder = require('../utils/middleware/authHandler');


function userApi(app) {
    const router = express.Router();
    app.use('/api/users', router);
    const options = { projection: { password: 0 } };
    const userService = new MongoService("users", options);

    router.get(
        '/',
        authHanlder,
        async function (req, res, next) {
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
        authHanlder,
        validatorHandler({ id: idSchema }, 'params'),
        async function (req, res, next) {
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
        authHanlder,
        validatorHandler(createUserSchema),
        async function (req, res, next) {
            const { body: user } = req;

            try {
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
        authHanlder,
        validatorHandler({ id: idSchema }, 'params'),
        validatorHandler(updateUserSchema),
        async function (req, res, next) {
            const { body } = req;
            const { id } = req.params;

            try {
                const { email } = body;
                const users = await userService.listAll({ email, _id: { $ne: ObjectId(id) } });
                if (users.length) return res.status(400).json({
                    message: 'email already registered'
                });

                const user = await userService.update({ body, query: { id } });
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
        authHanlder,
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