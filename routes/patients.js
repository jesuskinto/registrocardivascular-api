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


async function cleanFilters(filters) {
    const {
        firstSurgeon,
        textSearch,
        datesRange,
        accidente_cerebro_vascular,
        delirio,
        fibrilacion_auricular,
        infeccion_herida_superficial,
        muerte,
        ...diagnosis
    } = filters


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
        const protocols = await surgicalProtocolsService.listAll({ firstSurgeon });
        const ids = protocols.map(p => ObjectID(p.patient))
        if (patientQuery._id) Object.assign(patientQuery._id, { $in: ids })
        else Object.assign(patientQuery, { _id: { $in: ids } })
    }


    let fields = []
    if (delirio) fields.push({ 'complicaciones.delirio_alucinaciones': true })
    if (accidente_cerebro_vascular) fields.push({ 'complicaciones.accidente_vascular_cerebra': { $in: ['isaquemico', 'hemorragicotrue'] } })
    if (fibrilacion_auricular) fields.push({ 'complicaciones.arritmias': 'fa' })
    if (muerte) fields.push({ 'complicaciones.muerte.presente': true })
    if (infeccion_herida_superficial) fields.push({ 'complicaciones.infeccion_herida_operatoria_superficial.presente': true })

    if (fields.length > 0) {
        const heartSurgeryService = new MongoService('heartSurgery', { patient: 1 });
        const res = await heartSurgeryService.listAll({ $and: fields })

        if (res) {
            const patientIdInHeartSurgery = res.map(p => ObjectID(p.patient))
            if (patientQuery._id && patientQuery._id.$in) Object.assign(patientQuery._id.$in, { patientIdInHeartSurgery })
            else if (patientQuery._id) Object.assign(patientQuery._id, { $in: patientIdInHeartSurgery })
            else Object.assign(patientQuery, { _id: { $in: patientIdInHeartSurgery } })
        }

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
        validatorHandler(queryPatient, 'query'),
        async function (req, res, next) {
            const order = { _id: -1 };
            let { page = 1, ...filters } = req.query;

            const patientQuery = await cleanFilters(filters);
            page = Number(page);
            const resPerPage = 9;
            try {
                const { res: patients, count } = await patientService.listAll(patientQuery, { page, resPerPage }, order);
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
                    patient.pph = await pphService.list({ patient: id });
                    patient.coronaryAngiography = await coronaryAngiographyService.list({ patient: id });
                    patient.transthoracicEchocardiogram = await transthoracicEchocardiogramService.list({ patient: id });
                    patient.heartSurgery = await heartSurgeryService.list({ patient: id });
                    patient.extracorporealCirculation = await extracorporealCirculationService.list({ patient: id });
                    patient.others = await othersService.list({ patient: id });
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