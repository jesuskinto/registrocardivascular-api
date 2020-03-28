const express = require('express');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createOrUpdatecoronaryAngiographySchema
} = require('../utils/schemas/coronaryAngiography');
const validatorHandler = require('../utils/middleware/validatorHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time')


function coronaryAngiographyApi(app) {
    const router = express.Router();
    app.use('/api/coronary-angiography', router);
    const options = {};
    const coronaryAngiographyService = new MongoService('coronaryAngiography', options);

    router.get('/', async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { query } = req;
        try {
            const pphs = await coronaryAngiographyService.listAll(query);
            res.status(200).json({
                data: pphs,
                message: 'coronary angiographys listed'
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
                const coronaryAngiography = await coronaryAngiographyService.list({ patient: id });
                res.status(200).json({
                    data: coronaryAngiography,
                    message: 'coronary angiography listed'
                });
            } catch (error) {
                next(error);
            }
        });

    router.post(
        '/',
        validatorHandler(createOrUpdatecoronaryAngiographySchema),
        async function (req, res, next) {
            const { body: coronaryAngiography } = req;
            const { id } = req.params;
            coronaryAngiography.patient = id

            try {
                const patientId = await coronaryAngiographyService.create({ payload: coronaryAngiography });
                res.status(200).json({
                    data: patientId,
                    message: 'coronary angiography created'
                });
            } catch (error) {
                next(error);
            }
        });

    router.patch(
        '/:id',
        validatorHandler({ id: idSchema }, 'params'),
        validatorHandler(createOrUpdatecoronaryAngiographySchema),
        async function (req, res, next) {
            const { body } = req;
            const { id } = req.params;

            try {
                const user = await coronaryAngiographyService.update({ body, query: { patient: id } });
                res.status(200).json({
                    data: user,
                    message: 'coronary angiography edited'
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
                const patientId = await coronaryAngiographyService.remove({ id })
                res.status(200).json({
                    data: patientId,
                    message: 'coronary angiography deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = coronaryAngiographyApi;