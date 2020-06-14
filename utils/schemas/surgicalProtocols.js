const {
    stringSchema,
    arraySchema,
    dateSchema
} = require('./commons');


const createOrUpdatePatientSchema = {
    operativeNotes: stringSchema,
    firstSurgeon: stringSchema,
    date: dateSchema,
    othersSurgeons: arraySchema
};

module.exports = {
    createOrUpdatePatientSchema
};



