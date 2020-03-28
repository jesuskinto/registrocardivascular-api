const joi = require('@hapi/joi');
const booleanSchema = joi.boolean();
const diabetesSchema = joi.string();
const enfermedadCerebroVascularSchema = joi.string();
const enfermedadRenalSchema = joi.object();
const cancerSchema = joi.object();
const endocarditisSchema = joi.string();
const stringSchema = joi.string();
const arritmiaVentricularesSchema = joi.string();
const bloqueoAvSchema = joi.object();
const infartoAgudoMiocardioSchema = joi.string();
const claseFuncionalHyhaSchema = joi.string();
const shockCardiogenicoSchema = joi.object();


const createOrUpdatePatientSchema = {
    diabetes: diabetesSchema,
    hipertencion: booleanSchema,
    asma: booleanSchema,
    enfermedad_renal: enfermedadRenalSchema,
    enfermedad_arterial_periferica: booleanSchema,
    enfermedad_cerebro_vascular: enfermedadCerebroVascularSchema,
    enfermedad_pulmonar_obstructiva_cronica: booleanSchema,
    enfermedad_carotidea: booleanSchema,
    tabaquismo: booleanSchema,
    alcohol: booleanSchema,
    drogas: booleanSchema,
    cancer: cancerSchema,
    endocarditis: endocarditisSchema,
    enfermedad_hepatica: booleanSchema,
    apnea_del_sueno: booleanSchema,
    inmunosupresion: booleanSchema,
    radiacion_mediastinal: booleanSchema,
    alergia_medicamentos: stringSchema,
    cirugias_previas: stringSchema,
    fibrilacion_auricular: stringSchema,
    flutter_auricular: booleanSchema,
    arritmia_ventriculares: arritmiaVentricularesSchema,
    bloqueo_av: bloqueoAvSchema,
    infarto_agudo_miocardio: infartoAgudoMiocardioSchema,
    infarto_agudo_miocardio_tratamiento: stringSchema,
    clase_funcional_nyha: claseFuncionalHyhaSchema,
    shock_cardiogenico: shockCardiogenicoSchema
};

module.exports = {
    createOrUpdatePatientSchema
};



