const joi = require('@hapi/joi');
const stringSchema = joi.string();
const objectSchema = joi.object();
const dateSchema = joi.date();

const createOrUpdatePatientSchema = {
    hora_inicio_cirugia: dateSchema,
    hora_fin_cirugia: dateSchema,
    hora_inicio_cec: dateSchema,
    tiempo_clamp: stringSchema,
    tiempo_cec_total: stringSchema,
    asistencia_ventricular_izquierda_postoperatoria: stringSchema,
    cardioplegia: objectSchema,
    canulacion: objectSchema,
    tiempo_arresto_circulatorio: objectSchema,
    perfusion_cerebral: objectSchema
};

module.exports = {
    createOrUpdatePatientSchema
};



