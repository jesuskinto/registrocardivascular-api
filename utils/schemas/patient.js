const joi = require('@hapi/joi');
const rutSchema = joi.number();
const patientNameSchema = joi.string().min(3).max(30);
const patienBirthdaySchema = joi.date();
const patienAccountSchema = joi.string().min(0).max(30).allow('');
const patienPhoneSchema = joi.number().allow('');
const patienWeightSchema = joi.number().allow('');
const patienImcSchema = joi.number().allow('');
const patienSizeSchema = joi.string().allow('');
const patienAddressSchema = joi.string().allow('');

const createPatientSchema = {
    rut: rutSchema.required(),
    firstname: patientNameSchema.required(),
    lastname: patientNameSchema.required(),
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
    firstname: patientNameSchema,
    lastname: patientNameSchema,
    birthdate: patienBirthdaySchema,
    account: patienAccountSchema,
    phone: patienPhoneSchema,
    weight: patienWeightSchema,
    imc: patienImcSchema,
    size: patienSizeSchema,
    address: patienAddressSchema
};


module.exports = {
    createPatientSchema,
    updatePatientSchema
};

