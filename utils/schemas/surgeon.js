const joi = require('@hapi/joi');

const surgeonIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const rutSchema = joi.number();
const userNameSchema = joi.string().alphanum().min(3).max(30);

const createUserSchema = {
    rut: rutSchema.required(),
    firstname: userNameSchema.required(),
    lastname: userNameSchema.required(),
};

const updateUserSchema = {
    rut: rutSchema,
    firstname: userNameSchema,
    lastname: userNameSchema,
};


module.exports = {
    surgeonIdSchema,
    createUserSchema,
    updateUserSchema
};