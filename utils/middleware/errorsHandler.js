const boom = require('@hapi/boom')
const { config } = require('../../config')

function withErroStack(error, stack) {
    if (config.dev) {
        return { ...error, stack };
    }

    return error;
}

function logError(err, req, res, next) {
    // console.log(err);
    next(err);
}

function wrraperError(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }

    next(err);
}

function errorHandler(err, req, res, next) {
    const { output: { statusCode, payload } } = err;
    res.status(statusCode);
    res.json(withErroStack(payload, err.stack))
}

module.exports = {
    logError,
    wrraperError,
    errorHandler
}
