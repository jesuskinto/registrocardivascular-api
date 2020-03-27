const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createPatientSchema,
    updatePatientSchema
} = require('../utils/schemas/patient');
const validatorHandler = require('../utils/middleware/validatorHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time')


function patientApi(app) {
    const router = express.Router();
    app.use('/api/patients', router);
    const options = { projection: { password: 0 } };
    const patientService = new MongoService('patients', options);

    router.get('/', async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { query } = req;
        try {
            const patients = await patientService.listAll(query);
            res.status(200).json({
                data: patients,
                message: 'patients listed'
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
                const patient = await patientService.list({ id });
                res.status(200).json({
                    data: patient,
                    message: 'patient listed'
                });
            } catch (error) {
                next(error);
            }
        });

    router.post(
        '/',
        validatorHandler(createPatientSchema),
        async function (req, res, next) {
            const { body: patient } = req;

            try {
                const patientId = await patientService.create({ payload: patient });
                res.status(200).json({
                    data: patientId,
                    message: 'patient created'
                });
            } catch (error) {
                next(error);
            }
        });

    router.patch(
        '/:id',
        validatorHandler({ id: idSchema }, 'params'),
        validatorHandler(updatePatientSchema),
        async function (req, res, next) {
            const { body } = req;
            const { id } = req.params;

            try {
                const user = await patientService.update({ body, id });
                res.status(200).json({
                    data: user,
                    message: 'patient edited'
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
                const patientId = await patientService.remove({ id })
                res.status(200).json({
                    data: patientId,
                    message: 'patient deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = patientApi;