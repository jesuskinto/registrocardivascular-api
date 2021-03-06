const express = require('express');
const { ObjectId } = require('mongodb');
const MongoService = require('../services/mongoService');
const { idSchema } = require('../utils/schemas/commons');
const { asyncForEach } = require('../utils/commonsFunctions');
const {
    createOrUpdatePatientSchema
} = require('../utils/schemas/surgicalProtocols');
const validatorHandler = require('../utils/middleware/validatorHandler');
const authHanlder = require('../utils/middleware/authHandler');

const surgeonService = new MongoService("surgeon");
async function setSurgions({ firstSurgeon, othersSurgeons }) {
    if (firstSurgeon) firstSurgeon = await surgeonService.list({ id: firstSurgeon });
    if (othersSurgeons.length) {
        const others = othersSurgeons.map(surgeon => ObjectId(surgeon))
        othersSurgeons = await surgeonService.listAll({ _id: { $in: others } });
    }
    return { firstSurgeon, othersSurgeons }
}


function surgicalProtocolsApi(app) {
    const router = express.Router();
    app.use('/api/surgical-protocols', router);
    const options = {};
    const surgicalProtocolsService = new MongoService('surgicalProtocols', options);


    router.get(
        '/',
        authHanlder,
        async function (req, res, next) {
            const { query } = req;
            try {
                const protocols = await surgicalProtocolsService.listAll(query);
                res.status(200).json({
                    data: protocols,
                    message: 'surgical protocols listed'
                });
            } catch (error) {
                next(error);
            }
        });

    router.get(
        '/:id/:id_protocol?',
        authHanlder,
        validatorHandler({ id: idSchema, id_protocol: idSchema }, 'params'),
        async function (req, res, next) {
            const { id, id_protocol } = req.params;
            try {
                if (id_protocol) {
                    const protocol = await surgicalProtocolsService.list({ id: id_protocol });
                    const { firstSurgeon, othersSurgeons } = await setSurgions(protocol)
                    protocol.firstSurgeon = firstSurgeon
                    protocol.othersSurgeons = othersSurgeons
                    return res.status(200).json({
                        data: protocol,
                        message: 'surgical protocol listed'
                    });
                }

                const protocols = await surgicalProtocolsService.listAll({ patient: id });
                await asyncForEach(protocols, async (protocol, i) => {
                    const { firstSurgeon, othersSurgeons } = await setSurgions(protocol)
                    protocols[i].firstSurgeon = firstSurgeon
                    protocols[i].othersSurgeons = othersSurgeons
                })
                res.status(200).json({
                    data: protocols,
                    message: 'surgical protocols listed'
                });
            } catch (error) {
                next(error);
            }
        });

    router.post(
        '/:id',
        authHanlder,
        validatorHandler({ id: idSchema }, 'params'),
        validatorHandler(createOrUpdatePatientSchema),
        async function (req, res, next) {
            const { body: surgicalProtocols } = req;
            const { id } = req.params;
            surgicalProtocols.patient = ObjectId(id)

            try {
                const protocol = await surgicalProtocolsService.create({ payload: surgicalProtocols });
                res.status(200).json({
                    data: protocol,
                    message: 'surgical protocol created'
                });
            } catch (error) {
                next(error);
            }
        });

    router.patch(
        '/:id/:id_protocol',
        authHanlder,
        validatorHandler({ id: idSchema, id_protocol: idSchema }, 'params'),
        validatorHandler(createOrUpdatePatientSchema),
        async function (req, res, next) {
            const { body } = req;
            const { id, id_protocol } = req.params;

            try {
                const protocols = await surgicalProtocolsService.update({ body, query: { id: id_protocol, patient: id } });
                res.status(200).json({
                    data: protocols,
                    message: 'surgical protocol edited'
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
                const patientId = await surgicalProtocolsService.remove({ id })
                res.status(200).json({
                    data: patientId,
                    message: 'surgical protocol deleted'
                });
            } catch (error) {
                next(error);
            }
        });
}

module.exports = surgicalProtocolsApi;