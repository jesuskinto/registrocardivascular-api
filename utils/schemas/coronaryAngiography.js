const {
    stringSchema,
    booleanSchema,
    dateSchema,
    objectSchema
} = require('./commons');


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



