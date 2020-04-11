const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createOrUpdatePatientSchema
} = require('../utils/schemas/pph');
const validatorHandler = require('../utils/middleware/validatorHandler');
const authHanlder = require('../utils/middleware/authHandler');

function pphApi(app) {
    const router = express.Router();
    app.use('/api/pph', router);
    const options = {};
    const pphService = new MongoService('pph', options);

    router.get(
        '/',
        authHanlder,
        async function (req, res, next) {
            const { query } = req;
            try {
                const pphs = await pphService.listAll(query);
                res.status(200).json({
                    data: pphs,
                    message: 'pathological personal histories listed'
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
                const pph = await pphService.list({ patient: id });
                res.status(200).json({
                    data: pph,
                    message: 'pathological personal history listed'
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
            const { body: pph } = req;
            const { id } = req.params;
            pph.patient = id

            try {
                const patientId = await pphService.create({ payload: pph });
                res.status(200).json({
                    data: patientId,
                    message: 'pathological personal history created'
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
                const user = await pphService.update({ body, query: { patient: id } });
                res.status(200).json({
                    data: user,
                    message: 'pathological personal history edited'
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
                const patientId = await pphService.remove({ id })
                res.status(200).json({
                    data: patientId,
                    message: 'pathological personal history deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = pphApi;