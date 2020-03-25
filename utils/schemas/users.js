const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().min(3).max(30);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().alphanum().min(3).max(30);

const createUserSchema = {
    firstname: userNameSchema.required(),
    lastname: userNameSchema.required(),
    email: userEmailSchema.required(),
    password: userPasswordSchema.required(),
};


const updateUserSchema = {
    firstname: userNameSchema,
    lastname: userNameSchema,
    email: userEmailSchema,
    password: userPasswordSchema,
};

const authSchema = {
    email: userEmailSchema.required(),
    password: userPasswordSchema.required(),
}


module.exports = {
    userIdSchema,
    createUserSchema,
    updateUserSchema,
    authSchema
};