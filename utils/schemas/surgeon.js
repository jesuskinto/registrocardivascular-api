const joi = require('@hapi/joi');

const surgeonIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().min(3).max(30);

const createSurgeonSchema = {
    firstname: userNameSchema.required(),
    lastname: userNameSchema.required(),
};

const updateSurgeonSchema = {
    firstname: userNameSchema,
    lastname: userNameSchema,
};


module.exports = {
    surgeonIdSchema,
    createSurgeonSchema,
    updateSurgeonSchema
};