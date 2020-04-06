const joi = require('@hapi/joi');
const rutSchema = joi.number();
const patientStringSchema = joi.string().min(3).max(30);
const patienBirthdaySchema = joi.date();
const patienAccountSchema = joi.string().min(0).max(30).allow('');
const patienPhoneSchema = joi.number().allow('');
const patienWeightSchema = joi.number().allow('');
const patienImcSchema = joi.number().allow('');
const patienSizeSchema = joi.string().allow('');
const patienAddressSchema = joi.string().allow('');
const booleanSchema = joi.boolean();

const createPatientSchema = {
    rut: rutSchema.required(),
    firstname: patientStringSchema.required(),
    lastname: patientStringSchema.required(),
    birthdate: patienBirthdaySchema,
    account: patienAccountSchema,
    phone: patienPhoneSchema,
    weight: patienWeightSchema,
    imc: patienImcSchema,
    size: patienSizeSchema,
    address: patienAddressSchema
};

const updatePatientSchema = {
    rut: rutSchema,
    firstname: patientStringSchema,
    lastname: patientStringSchema,
    birthdate: patienBirthdaySchema,
    account: patienAccountSchema,
    phone: patienPhoneSchema,
    weight: patienWeightSchema,
    imc: patienImcSchema,
    size: patienSizeSchema,
    address: patienAddressSchema
};

const queryPatient = {
    textSearch: patientStringSchema,
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
    ductus_arteriosus_persistente: booleanSchema
};


module.exports = {
    createPatientSchema,
    updatePatientSchema,
    queryPatient
};

