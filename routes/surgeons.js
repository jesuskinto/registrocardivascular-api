const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createSurgeonSchema,
    updateSurgeonSchema
} = require('../utils/schemas/surgeon');
const validatorHandler = require('../utils/middleware/validatorHandler');
const authHanlder = require('../utils/middleware/authHandler');


const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time')


function surgeonApi(app) {
    const router = express.Router();
    app.use('/api/surgeons', router);
    const options = {};
    const surgeonService = new MongoService("surgeon", options);

    router.get(
        '/',
        authHanlder,
        async function (req, res, next) {
            cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
            const { query } = req;
            try {
                const users = await surgeonService.listAll(query);
                res.status(200).json({
                    data: users,
                    message: 'surgeons listed'
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
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
            const { id } = req.params;
            try {
                const user = await surgeonService.list({ id });
                res.status(200).json({
                    data: user,
                    message: 'surgeon listed'
                });
            } catch (error) {
                next(error);
            }
        });

    router.post(
        '/',
        authHanlder,
        validatorHandler(createSurgeonSchema),
        async function (req, res, next) {
            const { body: user } = req;

            try {
                const userId = await surgeonService.create({ payload: user });
                res.status(200).json({
                    data: userId,
                    message: 'surgeon created'
                });
            } catch (error) {
                next(error);
            }
        });

    router.patch(
        '/:id',
        authHanlder,
        validatorHandler({ id: idSchema }, 'params'),
        validatorHandler(updateSurgeonSchema),
        async function (req, res, next) {
            const { body } = req;
            const { id } = req.params;

            try {
                const user = await surgeonService.update({ body, query: { id } });
                res.status(200).json({
                    data: user,
                    message: 'surgeon edited'
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
                const userId = await surgeonService.remove({ id })
                res.status(200).json({
                    data: userId,
                    message: 'surgeon deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = surgeonApi;