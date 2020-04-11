const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createOrUpdatePatientSchema
} = require('../utils/schemas/diagnosis');
const validatorHandler = require('../utils/middleware/validatorHandler');
const authHanlder = require('../utils/middleware/authHandler');


function diagnosisApi(app) {
    const router = express.Router();
    app.use('/api/diagnosis', router);
    const options = { projection: { diagnosis: 1 } };
    const diagnosisService = new MongoService('patients', options);


    router.get(
        '/',
        authHanlder,
        async function (req, res, next) {
            const { query } = req;
            try {
                const diagnosiss = await diagnosisService.listAll(query);
                res.status(200).json({
                    data: diagnosiss,
                    message: 'diagnosis listed'
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
                const resp = await diagnosisService.list({ id });
                res.status(200).json({
                    data: resp.diagnosis || {},
                    message: 'diagnosis listed'
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
            const { body: diagnosis } = req;
            const { id } = req.params;
            try {
                const resp = await diagnosisService.update({ body: { diagnosis }, query: { id } });
                res.status(200).json({
                    data: resp,
                    message: 'diagnosis created'
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
            const { body: diagnosis } = req;
            const { id } = req.params;

            try {
                const resp = await diagnosisService.update({ body: { diagnosis }, query: { id } });
                res.status(200).json({
                    data: resp,
                    message: 'diagnosis edited'
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
                const resp = await diagnosisService.update({ body: { diagnosis: {} }, query: { id } })
                res.status(200).json({
                    data: resp,
                    message: 'diagnosis deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = diagnosisApi;