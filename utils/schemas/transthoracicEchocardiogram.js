const {
    stringSchema,
    objectSchema
} = require('./commons');

const createOrUpdatePatientSchema = {
    esternosis_aortica: objectSchema,
    valvula: stringSchema,
    insuficiencia_aortica: objectSchema,
    estenosis_mitral: objectSchema,
    insuficiencia_mitral: objectSchema,
    insuficiencia_valvula_tricuspide: objectSchema,
    estenosis_valvula_tricuspide: objectSchema,
    estenosis_valvula_pulmonar: objectSchema,
    insuficiencia_valvula_pulmonar: objectSchema,
    derrame_pericardico: objectSchema,
    fevi: stringSchema,
    dilatacion_auricula_izquierda: stringSchema,
    dilatacionde_orejuela_izquierda: stringSchema,
    dilatación_de_vi: stringSchema,
    dilatación_raiz_aortica: stringSchema,
    dilatacion_aorta_ascendente: stringSchema,
    presencia_trombos: stringSchema,
    diametro_al_final_de_diastole: stringSchema,
    DSF: stringSchema,
    trasntorno_contractivilidad: stringSchema,
    engrosamiento_pericardio: stringSchema,
    engrosamiento_septal: stringSchema,
    ecocardiograma_stress_dobutamina: stringSchema,
    resonancia_cardiaca: objectSchema,
    score_fragilidad: stringSchema,
    tratamiento_actual: stringSchema
};

module.exports = {
    createOrUpdatePatientSchema
};



