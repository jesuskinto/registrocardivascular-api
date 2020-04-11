const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createOrUpdatePatientSchema
} = require('../utils/schemas/extracorporealCirculation');
const validatorHandler = require('../utils/middleware/validatorHandler');
const authHanlder = require('../utils/middleware/authHandler');

function pphApi(app) {
    const router = express.Router();
    app.use('/api/extracorporeal-circulation', router);
    const options = {};
    const extracorporealCirculationService = new MongoService('extracorporealCirculation', options);

    router.get(
        '/',
        authHanlder,
        async function (req, res, next) {
            const { query } = req;
            try {
                const extracorporealCirculations = await extracorporealCirculationService.listAll(query);
                res.status(200).json({
                    data: extracorporealCirculations,
                    message: 'extracorporeal circulations listed'
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
                const extracorporealCirculation = await extracorporealCirculationService.list({ patient: id });
                res.status(200).json({
                    data: extracorporealCirculation,
                    message: 'extracorporeal circulation listed'
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
            const { body: extracorporealCirculation } = req;
            const { id } = req.params;
            extracorporealCirculation.patient = id

            try {
                const patientId = await extracorporealCirculationService.create({ payload: extracorporealCirculation });
                res.status(200).json({
                    data: patientId,
                    message: 'extracorporeal circulation created'
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
                const user = await extracorporealCirculationService.update({ body, query: { patient: id } });
                res.status(200).json({
                    data: user,
                    message: 'extracorporeal circulation edited'
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
                const patientId = await extracorporealCirculationService.remove({ id })
                res.status(200).json({
                    data: patientId,
                    message: 'extracorporeal circulation deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = pphApi;