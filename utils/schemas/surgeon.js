const joi = require('@hapi/joi');
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
    createSurgeonSchema,
    updateSurgeonSchema
};