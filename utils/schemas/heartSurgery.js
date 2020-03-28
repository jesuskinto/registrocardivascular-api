const joi = require('@hapi/joi');
const booleanSchema = joi.boolean();
const stringSchema = joi.string();
const objectSchema = joi.object();
const dateSchema = joi.date();


const createOrUpdatePatientSchema = {
    primera_cirujia: booleanSchema,
    redo: booleanSchema,
    programada: dateSchema,
    urgencia: booleanSchema,
    emergencia: booleanSchema,
    protesis_biologica: stringSchema,
    protesis_mecanica: stringSchema,
    valvula_mitral: objectSchema,
    revascularizacion_coronaria: objectSchema,
    cirugia_bentall: objectSchema,
    conducto_safena_interna: objectSchema,
    esternotomia: booleanSchema,
    miniesternotomia: booleanSchema,
    transapical: booleanSchema,
    anuloplastia_tricuspidea: stringSchema,
    miectomia_septal: stringSchema,
    mixoma: stringSchema,
    cirugia_arco_aortico: objectSchema,
    cierre_comunicacion_interauricular: objectSchema,
    cierre_civ: objectSchema,
    ventriculoseptoplastia: objectSchema,
    pericardiectomia_anterior: booleanSchema,
    opciones_quirurgicas: objectSchema,
    complicaciones: objectSchema
};

module.exports = {
    createOrUpdatePatientSchema
};



