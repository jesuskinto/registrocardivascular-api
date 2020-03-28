const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createOrUpdatePatientSchema
} = require('../utils/schemas/transthoracicEchocardiogram');
const validatorHandler = require('../utils/middleware/validatorHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time')


function transthoracicEchocardiogramApi(app) {
    const router = express.Router();
    app.use('/api/transthoracic-echocardiogram', router);
    const options = {};
    const transthoracicEchocardiogramService = new MongoService('transthoracicEchocardiogram', options);

    router.get('/', async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { query } = req;
        try {
            const pphs = await transthoracicEchocardiogramService.listAll(query);
            res.status(200).json({
                data: pphs,
                message: 'transthoracic echocardiogram listed'
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
                const transthoracicEchocardiogram = await transthoracicEchocardiogramService.list({ patient: id });
                res.status(200).json({
                    data: transthoracicEchocardiogram,
                    message: 'transthoracic echocardiogram listed'
                });
            } catch (error) {
                next(error);
            }
        });

    router.post(
        '/',
        validatorHandler(createOrUpdatePatientSchema),
        async function (req, res, next) {
            const { body: transthoracicEchocardiogram } = req;
            const { id } = req.params;
            transthoracicEchocardiogram.patient = id

            try {
                const patientId = await transthoracicEchocardiogramService.create({ payload: transthoracicEchocardiogram });
                res.status(200).json({
                    data: patientId,
                    message: 'transthoracic echocardiogram created'
                });
            } catch (error) {
                next(error);
            }
        });

    router.patch(
        '/:id',
        validatorHandler({ id: idSchema }, 'params'),
        validatorHandler(createOrUpdatePatientSchema),
        async function (req, res, next) {
            const { body } = req;
            const { id } = req.params;

            try {
                const user = await transthoracicEchocardiogramService.update({ body, query: { patient: id } });
                res.status(200).json({
                    data: user,
                    message: 'transthoracic echocardiogram edited'
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
                const patientId = await transthoracicEchocardiogramService.remove({ id })
                res.status(200).json({
                    data: patientId,
                    message: 'transthoracic echocardiogram deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = transthoracicEchocardiogramApi;