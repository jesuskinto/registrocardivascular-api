const joi = require('@hapi/joi');
const {
    idSchema,
    dateRangeSchema,
    stringSchema,
    booleanSchema,
    dateSchema
} = require('./commons');

const patientStringSchema = joi.string().min(3).max(30).allow('');
const patienAccountSchema = joi.string().min(0).max(30).allow('');
const patienPhoneSchema = joi.number().allow('');
const patienWeightSchema = joi.number().allow('');
const patienImcSchema = joi.number().allow('');
const patienSizeSchema = joi.string().allow('');
const patienAddressSchema = joi.string().allow('');
const diagnosisSchema = joi.object({
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
    accidente_cerebro_vascular: booleanSchema,
    delirio: booleanSchema,
    fibrilacion_auricular: booleanSchema,
    infeccion_herida_superficial: booleanSchema,
    muerte: booleanSchema,
});


const createPatientSchema = {
    rut: stringSchema.required(),
    firstname: patientStringSchema.required(),
    lastname: patientStringSchema.required(),
    birthdate: dateSchema,
    account: patienAccountSchema,
    phone: patienPhoneSchema,
    weight: patienWeightSchema,
    imc: patienImcSchema,
    size: patienSizeSchema,
    address: patienAddressSchema,
    diagnosis: diagnosisSchema
};

const updatePatientSchema = {
    rut: stringSchema,
    firstname: patientStringSchema,
    lastname: patientStringSchema,
    birthdate: dateSchema,
    account: patienAccountSchema,
    phone: patienPhoneSchema,
    weight: patienWeightSchema,
    imc: patienImcSchema,
    size: patienSizeSchema,
    address: patienAddressSchema,
    diagnosis: diagnosisSchema
};

const queryPatient = {
    textSearch: patientStringSchema,
    firstSurgeon: idSchema,
    datesRange: dateRangeSchema,
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
    accidente_cerebro_vascular: booleanSchema,
    delirio: booleanSchema,
    fibrilacion_auricular: booleanSchema,
    infeccion_herida_superficial: booleanSchema,
    muerte: booleanSchema,
    page: stringSchema
};


module.exports = {
    createPatientSchema,
    updatePatientSchema,
    queryPatient
};

