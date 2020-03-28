const joi = require('@hapi/joi');
const booleanSchema = joi.boolean();
const dateSchema = joi.date();
const stringSchema = joi.string();
const objectSchema = joi.object();


const createOrUpdatecoronaryAngiographySchema = {
    fecha: dateSchema,
    vasos_enfermos: stringSchema,
    enfermedad_tci: stringSchema,
    ada_proximal: stringSchema,
    fevi: stringSchema,
    arterias_revascularizadas: stringSchema,
    complicaciones: stringSchema,
    nro_coronariografias: stringSchema,
    clopidogrel: booleanSchema,
    ticagrelor: booleanSchema,
    angioplastia: objectSchema,
};

module.exports = {
    createOrUpdatecoronaryAngiographySchema
};



