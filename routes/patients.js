const express = require('express');
const { ObjectID } = require('mongodb');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const {
    createPatientSchema,
    updatePatientSchema,
    queryPatient
} = require('../utils/schemas/patient');
const validatorHandler = require('../utils/middleware/validatorHandler');
const authHanlder = require('../utils/middleware/authHandler');
const { isEmpty } = require('../utils/commonsFunctions')

const surgicalProtocolsService = new MongoService('surgicalProtocols');

function cleanTextSearch(textSearch) {
    textSearch = textSearch.replace(/(a|á)/i, '(a|á)');
    textSearch = textSearch.replace(/(e|é)/i, '(e|é)');
    textSearch = textSearch.replace(/(i|í)/i, '(i|í)');
    textSearch = textSearch.replace(/(o|ó)/i, '(o|ó)');
    textSearch = textSearch.replace(/(u|ú)/i, '(u|ú)');
    return new RegExp(textSearch, 'i');
}


async function cleanFilters({ firstSurgeon, textSearch, datesRange, ...diagnosis }) {
    const patientQuery = {}
    if (textSearch) {
        const cleanText = cleanTextSearch(textSearch);
        Object.assign(patientQuery, {
            $or: [
                { rut: cleanText },
                { firstname: cleanText },
                { lastname: cleanText }
            ]
        })
    }

    if (datesRange) {
        const gte = datesRange[0].split('T')[0].concat('T00:00:00.000Z')
        const lte = datesRange[1].split('T')[0].concat('T23:59:59.999Z')

        Object.assign(patientQuery, {
            _id: {
                $gte: ObjectID.createFromTime(new Date(gte) / 1000),
                $lte: ObjectID.createFromTime(new Date(lte) / 1000)
            }
        })
    }

    if (firstSurgeon) {
        const protocols = await surgicalProtocolsService.listAll({ firstSurgeon: firstSurgeon });
        const ids = protocols.map(p => ObjectID(p.patient))
        if (patientQuery._id) Object.assign(patientQuery._id, { $in: ids })
        else Object.assign(patientQuery, { _id: { $in: ids } })
    }

    for (let d in diagnosis) {
        if (diagnosis[d] === 'true') patientQuery[`diagnosis.${d}`] = true;
    }

    return patientQuery
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

    router.get('/',
        authHanlder,
        validatorHandler(queryPatient, 'params'),
        async function (req, res, next) {
            let { page = 1, ...filters } = req.query;
            const patientQuery = await cleanFilters(filters);

            page = Number(page);
            const resPerPage = 9;
            try {
                const { res: patients, count } = await patientService.listAll(patientQuery, { page, resPerPage });
                return res.status(200).json({
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
        authHanlder,
        validatorHandler({ id: idSchema }, 'params'),
        async function (req, res, next) {
            const { id } = req.params;
            const { all } = req.query;
            try {
                const patient = await patientService.list({ id });

                if (isEmpty(patient)) return res.status(400).json({
                    data: null,
                    message: 'patient not found'
                });

                if (all) {
                    const pph = await pphService.list({ patient: id });
                    const coronaryAngiography = await coronaryAngiographyService.list({ patient: id });
                    const transthoracicEchocardiogram = await transthoracicEchocardiogramService.list({ patient: id });
                    const heartSurgery = await heartSurgeryService.list({ patient: id });
                    const extracorporealCirculation = await extracorporealCirculationService.list({ patient: id });
                    const others = await othersService.list({ patient: id });

                    patient.pph = pph;
                    patient.coronaryAngiography = coronaryAngiography;
                    patient.transthoracicEchocardiogram = transthoracicEchocardiogram;
                    patient.heartSurgery = heartSurgery;
                    patient.extracorporealCirculation = extracorporealCirculation;
                    patient.others = others;
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
        authHanlder,
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
        authHanlder,
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
        authHanlder,
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