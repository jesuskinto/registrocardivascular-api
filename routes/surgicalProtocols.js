const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createOrUpdatePatientSchema
} = require('../utils/schemas/surgicalProtocols');
const validatorHandler = require('../utils/middleware/validatorHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time')


function surgicalProtocolsApi(app) {
    const router = express.Router();
    app.use('/api/surgical-protocols', router);
    const options = {};
    const surgicalProtocolsService = new MongoService('surgicalProtocols', options);

    router.get('/', async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { query } = req;
        try {
            const surgicalProtocolss = await surgicalProtocolsService.listAll(query);
            res.status(200).json({
                data: surgicalProtocolss,
                message: 'surgical protocols listed'
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
                const surgicalProtocols = await surgicalProtocolsService.listAll({ patient: id });
                res.status(200).json({
                    data: surgicalProtocols,
                    message: 'surgical protocol listed'
                });
            } catch (error) {
                next(error);
            }
        });

    router.post(
        '/',
        validatorHandler(createOrUpdatePatientSchema),
        async function (req, res, next) {
            const { body: surgicalProtocols } = req;
            const { id } = req.params;
            surgicalProtocols.patient = id

            try {
                const patientId = await surgicalProtocolsService.create({ payload: surgicalProtocols });
                res.status(200).json({
                    data: patientId,
                    message: 'surgical protocol created'
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
                const user = await surgicalProtocolsService.update({ body, query: { patient: id } });
                res.status(200).json({
                    data: user,
                    message: 'surgical protocol edited'
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
                const patientId = await surgicalProtocolsService.remove({ id })
                res.status(200).json({
                    data: patientId,
                    message: 'surgical protocol deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = surgicalProtocolsApi;