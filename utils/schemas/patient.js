const joi = require('@hapi/joi');

const patienIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const rutSchema = joi.number();
const patientNameSchema = joi.string().alphanum().min(3).max(30);
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
    birthday: patienBirthdaySchema.required(),
    bank_account: patienAccountSchema.required(),
    phone: patienPhoneSchema.required(),
    weight: patienWeightSchema.required(),
    imc: patienImcSchema.required(),
    size: patienSizeSchema.required(),
    address: patienAddressSchema.required()
};

const updatePatientSchema = {
    rut: rutSchema,
    firstname: patientNameSchema,
    lastname: patientNameSchema,
    birthday: patienBirthdaySchema,
    bank_account: patienAccountSchema,
    phone: patienPhoneSchema,
    weight: patienWeightSchema,
    imc: patienImcSchema,
    size: patienSizeSchema,
    address: patienAddressSchema
};


module.exports = {
    patienIdSchema,
    createPatientSchema,
    updatePatientSchema
};

