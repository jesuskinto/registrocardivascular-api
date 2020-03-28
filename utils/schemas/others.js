const joi = require('@hapi/joi');
const stringSchema = joi.string();
const objectSchema = joi.object();


const createOrUpdatePatientSchema = {
    dias_uci: stringSchema,
    dias_uti: stringSchema,
    dias_totales_hospitalizacion: stringSchema,
    dias_intubacion: stringSchema,
    drogras_vasoactivas: objectSchema,
    ecocardiograma_postoperatorio: objectSchema,
    control_postoperatorio: objectSchema
};

module.exports = {
    createOrUpdatePatientSchema
};



