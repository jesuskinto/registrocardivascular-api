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
    const options = {};
    const patientService = new MongoService('patients', options);
    const pphService = new MongoService('pph');
    const coronaryAngiographyService = new MongoService('coronaryAngiography');
    const transthoracicEchocardiogramService = new MongoService('transthoracicEchocardiogram');
    const heartSurgeryService = new MongoService('heartSurgery');
    const extracorporealCirculationService = new MongoService('extracorporealCirculation');
    const othersService = new MongoService('others');
    const surgicalProtocolsService = new MongoService('surgicalProtocols');

    router.get('/', async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { query } = req;
        try {
            const { textSearch } = query;
            if (textSearch) {
                //const patients = await patientService.listAll(query);
                return res.status(400).json({
                    data: [],
                    message: 'patients listed'
                });
            }

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
            const { all } = req.query;
            try {
                const patient = await patientService.list({ id });

                if (all) {
                    const pph = await pphService.list({ patient: id });
                    patient.pph = pph;

                    const coronaryAngiography = await coronaryAngiographyService.list({ patient: id });
                    patient.coronaryAngiography = coronaryAngiography;

                    const transthoracicEchocardiogram = await transthoracicEchocardiogramService.list({ patient: id });
                    patient.transthoracicEchocardiogram = transthoracicEchocardiogram;

                    const heartSurgery = await heartSurgeryService.list({ patient: id });
                    patient.heartSurgery = heartSurgery;

                    const extracorporealCirculation = await extracorporealCirculationService.list({ patient: id });
                    patient.extracorporealCirculation = extracorporealCirculation;

                    const others = await othersService.list({ patient: id });
                    patient.others = others;

                    const surgicalProtocols = await surgicalProtocolsService.list({ patient: id });
                    patient.surgicalProtocols = surgicalProtocols;

                    return res.status(200).json({
                        data: patient,
                        message: 'patient listed'
                    });
                }

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
                const user = await patientService.update({ body, query: { id } });
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
                await pphService.remove({ patient: id });
                await coronaryAngiographyService.remove({ patient: id });
                await transthoracicEchocardiogramService.remove({ patient: id });
                await heartSurgeryService.remove({ patient: id });
                await extracorporealCirculationService.remove({ patient: id });
                await othersService.remove({ patient: id });
                await surgicalProtocolsService.remove({ patient: id });

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