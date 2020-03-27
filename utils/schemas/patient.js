const joi = require('@hapi/joi');
const rutSchema = joi.number();
const patientNameSchema = joi.string().min(3).max(30);
const patienBirthdaySchema = joi.date();
const patienAccountSchema = joi.number();
const patienPhoneSchema = joi.number();
const patienWeightSchema = joi.string();
const patienImcSchema = joi.number();
const patienSizeSchema = joi.number();
const patienAddressSchema = joi.string();

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

