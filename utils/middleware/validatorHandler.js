const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validator(data, schema) {
    const { error } = joi.object(schema).validate(data);
    return error;
}

function validatorHandler(schema, check = 'body') {
    return function (req, res, next) {
        const error = validator(req[check], schema);

        error ? next(boom.badRequest(error)) : next();
    }
}

module.exports = validatorHandler;