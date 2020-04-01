const joi = require('@hapi/joi');
const stringSchema = joi.string();
const dateSchema = joi.date();
const arraySchema = joi.array();


const createOrUpdatePatientSchema = {
    operativeNotes: stringSchema,
    firstSurgeon: stringSchema,
    date: dateSchema,
    othersSurgeons: arraySchema
};

module.exports = {
    createOrUpdatePatientSchema
};



