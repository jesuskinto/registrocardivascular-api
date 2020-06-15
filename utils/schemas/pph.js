const {
    stringSchema,
    booleanSchema,
    objectSchema
} = require('./commons');


const createOrUpdatePatientSchema = {
    diabetes: stringSchema,
    hipertencion: booleanSchema,
    asma: booleanSchema,
    enfermedad_renal: objectSchema,
    enfermedad_arterial_periferica: booleanSchema,
    enfermedad_cerebro_vascular: stringSchema,
    enfermedad_pulmonar_obstructiva_cronica: booleanSchema,
    enfermedad_carotidea: booleanSchema,
    enfermedad_gastrica: booleanSchema,
    tabaquismo: booleanSchema,
    alcohol: booleanSchema,
    drogas: booleanSchema,
    cancer: objectSchema,
    endocarditis: stringSchema,
    enfermedad_hepatica: booleanSchema,
    apnea_del_sueno: booleanSchema,
    inmunosupresion: booleanSchema,
    radiacion_mediastinal: booleanSchema,
    alergia_medicamentos: stringSchema,
    cirugias_previas: stringSchema,
    fibrilacion_auricular: stringSchema,
    flutter_auricular: booleanSchema,
    arritmia_ventriculares: stringSchema,
    bloqueo_av: objectSchema,
    infarto_agudo_miocardio: stringSchema,
    infarto_agudo_miocardio_tratamiento: stringSchema,
    clase_funcional_nyha: stringSchema,
    shock_cardiogenico: objectSchema
};

module.exports = {
    createOrUpdatePatientSchema
};



