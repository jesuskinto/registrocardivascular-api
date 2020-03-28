const joi = require('@hapi/joi');
const rutSchema = joi.number();
const patientNameSchema = joi.string().min(3).max(30);
const patienBirthdaySchema = joi.date();
const patienAccountSchema = joi.string().min(10).max(30);
const patienPhoneSchema = joi.number();
const patienWeightSchema = joi.number();
const patienImcSchema = joi.number();
const patienSizeSchema = joi.string();
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

