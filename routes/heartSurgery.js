const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createOrUpdatePatientSchema
} = require('../utils/schemas/heartSurgery');
const validatorHandler = require('../utils/middleware/validatorHandler');
const authHanlder = require('../utils/middleware/authHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time')


function pphApi(app) {
    const router = express.Router();
    app.use('/api/heart-surgery', router);
    const options = {};
    const heartSurgeryService = new MongoService('heartSurgery', options);

    router.get(
        '/',
        authHanlder,
        async function (req, res, next) {
            cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
            const { query } = req;
            try {
                const heartSurgerys = await heartSurgeryService.listAll(query);
                res.status(200).json({
                    data: heartSurgerys,
                    message: 'heart surgery histories listed'
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
                const heartSurgery = await heartSurgeryService.list({ patient: id });
                res.status(200).json({
                    data: heartSurgery,
                    message: 'heart surgery history listed'
                });
            } catch (error) {
                next(error);
            }
        });

    router.post(
        '/',
        authHanlder,
        validatorHandler(createOrUpdatePatientSchema),
        async function (req, res, next) {
            const { body: heartSurgery } = req;
            const { id } = req.params;
            heartSurgery.patient = id

            try {
                const patientId = await heartSurgeryService.create({ payload: heartSurgery });
                res.status(200).json({
                    data: patientId,
                    message: 'heart surgery history created'
                });
            } catch (error) {
                next(error);
            }
        });

    router.patch(
        '/:id',
        authHanlder,
        validatorHandler({ id: idSchema }, 'params'),
        validatorHandler(createOrUpdatePatientSchema),
        async function (req, res, next) {
            const { body } = req;
            const { id } = req.params;

            try {
                const heartSurgery = await heartSurgeryService.update({ body, query: { patient: id } });
                res.status(200).json({
                    data: heartSurgery,
                    message: 'heart surgery history edited'
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
                const heartSurgery = await heartSurgeryService.remove({ id })
                res.status(200).json({
                    data: heartSurgery,
                    message: 'heart surgery history deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = pphApi;