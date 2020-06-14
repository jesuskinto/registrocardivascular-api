const {
    stringSchema,
    booleanSchema
} = require('./commons');

const createOrUpdatePatientSchema = {
    estenosis_aortica: booleanSchema,
    insuficiencia_aortica: booleanSchema,
    estenosis_mitral: booleanSchema,
    insuficiencia_mitral: booleanSchema,
    insuficiencia_tricuspidea: booleanSchema,
    aneurisma_aorta_ascendente: booleanSchema,
    enfermedad_valvular_aortica: booleanSchema,
    enfermedad_coronaria: booleanSchema,
    enfermedad_valvular_mitral: booleanSchema,
    enfermedad_aorta_ascendente: booleanSchema,
    miocardiopatia_hipertrofica_obstructiva: booleanSchema,
    comunicacion_interauricular: booleanSchema,
    comunicacion_interventricular: booleanSchema,
    pericardico_constrictiva: booleanSchema,
    ductus_arteriosus_persistente: booleanSchema,
    otros: stringSchema
};

module.exports = {
    createOrUpdatePatientSchema
};





