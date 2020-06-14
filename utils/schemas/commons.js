const joi = require('@hapi/joi');

const idSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const dateRangeSchema = joi.array().items(joi.date(), joi.date());
const stringSchema = joi.string();
const booleanSchema = joi.boolean();
const dateSchema = joi.date();
const arraySchema = joi.array();
const objectSchema = joi.object();

module.exports = {
    idSchema,
    dateRangeSchema,
    stringSchema,
    booleanSchema,
    dateSchema,
    arraySchema,
    objectSchema
};

