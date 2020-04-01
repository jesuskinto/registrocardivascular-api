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


function cleanTextSearch(textSearch) {
    textSearch = textSearch.replace(/(a|á)/i, '(a|á)');
    textSearch = textSearch.replace(/(e|é)/i, '(e|é)');
    textSearch = textSearch.replace(/(i|í)/i, '(i|í)');
    textSearch = textSearch.replace(/(o|ó)/i, '(o|ó)');
    textSearch = textSearch.replace(/(u|ú)/i, '(u|ú)');
    return new RegExp(textSearch, 'i');
}


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

    router.get('/', async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { query } = req;
        const page = Number(req.query.page || 1);
        delete query.page;
        const resPerPage = 9;

        try {
            const { textSearch } = query;
            if (textSearch) {
                const cleanText = cleanTextSearch(textSearch);
                const patientQuery = {
                    $or: [
                        { rut: cleanText },
                        { firstname: cleanText },
                        { lastname: cleanText }
                    ]
                }
                const { res: patients, count } = await patientService.listAll(patientQuery, { page, resPerPage });
                return res.status(200).json({
                    data: patients,
                    count,
                    page,
                    resPerPage,
                    message: 'patients listed'
                });
            } else delete query.textSearch;

            const { res: patients, count } = await patientService.listAll(query, { page, resPerPage });
            res.status(200).json({
                data: patients,
                count,
                page,
                resPerPage,
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