const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createOrUpdatePatientSchema
} = require('../utils/schemas/others');
const validatorHandler = require('../utils/middleware/validatorHandler');
const authHanlder = require('../utils/middleware/authHandler');

function pphApi(app) {
    const router = express.Router();
    app.use('/api/others', router);
    const options = {};
    const othersService = new MongoService('others', options);

    router.get(
        '/',
        authHanlder,
        async function (req, res, next) {
            const { query } = req;
            try {
                const pphs = await othersService.listAll(query);
                res.status(200).json({
                    data: pphs,
                    message: 'others listed'
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
                const others = await othersService.list({ patient: id });
                res.status(200).json({
                    data: others,
                    message: 'others listed'
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
            const { body: others } = req;
            const { id } = req.params;
            others.patient = id

            try {
                const patientId = await othersService.create({ payload: others });
                res.status(200).json({
                    data: patientId,
                    message: 'others created'
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
                const user = await othersService.update({ body, query: { patient: id } });
                res.status(200).json({
                    data: user,
                    message: 'others edited'
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
                const patientId = await othersService.remove({ id })
                res.status(200).json({
                    data: patientId,
                    message: 'others deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = pphApi;