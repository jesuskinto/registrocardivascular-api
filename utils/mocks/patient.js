const patient = [
    {
        rut: 25619081,
        firstname: 'Jesus Miguel',
        lastname: 'Quinto Teran',
        birthday: '17/02/1996',
        bank_account: 501878200072531280,
        phone: '0416-9754568',
        weight: 65,
        imc: 50,
        size: 'S',
        address: 'Las Marias, Merida Venezuela'
    }
]

const pathological_personal_history = [
    {
        rut: 25619081,
        diabetes: null,
        hipertencion: false,
        asma: false,
        enfermedad_renal: {
            tipo: null,
            estadio: null,
            dialisis: null
        },
        enfermedad_arterial_periferica: false,
        enfermedad_cerebro_vascular: null,
        enfermedad_pulmonar_obstructiva_cronica: false,
        enfermedad_carotidea: false,
        tabaquismo: false,
        alcohol: false,
        drogas: false,
        cancer: {
            tipo: '',
            localizacion: ''
        },
        endocarditis: null,
        enfermedad_hepatica: false,
        apnea_del_sueno: false,
        inmunosupresion: false,
        radiación_mediastinal: false,
        alergia_medicamentos: null,
        cirugias_previas: null,
        fibrilacion_auricular: null,
        flutter_auricular: false,
        arritmia_ventriculares: null,
        bloqueo_av: {
            grado: null,
            marcapaso: null
        },
        infarto_agudo_miocardio: null,
        infarto_agudo_miocardio_tratamiento: '',
        clase_funcional_nyha: null,
        shock_cardiogenico: {
            colocacion: null,
            presente: null
        }

    }
]

const coronary_angiography = [
    {
        rut: 25619081,
        fecha: null,
        vasos_enfermos: null,
        enfermedad_tci: null,
        ada_proximal: null,
        fevi: null,
        arterias_revascularizadas: "",
        complicaciones: "",
        nro_coronariografias: "",
        clopidogrel: false,
        ticagrelor: false,
        angioplastia: {
            presente: null,
            pcta: null
        }
    }
]

const transthoracic_echocardiogram = [
    {
        rut: 25619081,
        esternosis_aortica: {
            tipo: null,
            vmax: null,
            ava: null,
            gmed: null
        },
        valvula: null,
        insuficiencia_aortica: {
            tipo: null,
            dilatacion_anular: null,
            prolapso_velo: null,
            perforacion_velo: null,
            vena_contracta: null,
            vol_regurgitante: null,
            ore: null
        },
        estenosis_mitral: {
            tipo: null,
            valor: [],
            AVA: null,
            GMED: null
        },
        insuficiencia_mitral: {
            tipo: null,
            valor: []
        },
        insuficiencia_valvula_tricuspide: {
            tipo: null,
            valor: []
        },
        estenosis_valvula_tricuspide: {
            tipo: null,
            valor: []
        },
        estenosis_valvula_pulmonar: {
            tipo: null,
            valor: []
        },
        insuficiencia_valvula_pulmonar: {
            tipo: null
        },
        derrame_pericardico: {
            tipo: null
        },
        fevi: null,
        dilatacion_auricula_izquierda: null,
        dilatacionde_orejuela_izquierda: null,
        dilatación_de_vi: null,
        dilatación_raiz_aortica: null,
        dilatacion_aorta_ascendente: null,
        presencia_trombos: null,
        diametro_al_final_de_diastole: null,
        DSF: null,
        engrosamiento_pericardio: null,
        engrosamiento_septal: null,
        trasntorno_contractivilidad: null,
        ecocardiograma_stress_dobutamina: null,
        resonancia_cardiaca: {
            fevi: null,
            septum_ventricular: null,
            viabilidad: null
        },
        score_fragilidad: null,
        tratamiento_actual: ""
    }
]

const heart_surgery = [
    {
        rut: 25619081,
        primera_cirujia: false,
        redo: false,
        programada: null,
        urgencia: false,
        emergencia: false,
        protesis_biologica: null,
        protesis_mecanica: null,
        valvula_mitral: {
            protesis_biologica: null,
            protesis_mecanica: null,
            esternotomia: null,
            minimainvasiva: null,
            anuloplastia: null
        },
        revascularizacion_coronaria: {},
        cirugia_bentall: {
            presente: null,
            tipo: null,
            numero: null,
            clase: null
        },
        conducto_safena_interna: {
            conducto_safena_interna: null,
            tipo: null,
            tecnica: null,
            arteria_radial: null
        },
        mixoma: null,
        cirugia_arco_aortico: {
            tubo_dacron: null,
            thoraflex: null,
            nro: null
        },
        cierre_comunicacion_interauricular: {
            tamano_defecto_auricular: null,
            parche_pericardio: null,
            parche_dacron: null
        },
        cierre_civ: {
            clasificacion: null,
            tipo: null,
            parche: null
        },
        ventriculoseptoplastia: {
            parche: null
        },
        pericardiectomia_anterior: false,
        opciones_quirurgicas: {
            lima_rima: null,
            opciones: []
        },
        complicaciones: {
            reintervencion: {
                causa: null,
                tiempo_despues: null
            },
            derrame_pericardico: {
                tipo: null,
                neumotorax: null
            },
            accidente_vascular_cerebra: null,
            delirio_alucinaciones: false,
            arritmias: null,
            bloqueo_av: {
                tipo: null,
                marcapaso: null
            },
            infeccion_herida_operatoria_superficial: {
                cultivo: null,
                tiempo_desde_cirugia: null
            },
            infenccion_herida_operatoria_profunda: {
                cultivo: null,
                tiempo_desde_cirugia: null,
                hospitalizacion: null
            },
            dehiscencia_esternal: {
                tratamiento: null,
                presente: null
            },
            derrame_pleural: {
                tipo: null,
                presente: null
            },
            mediastinitis: {
                cultivo: null,
                hospitalizacion: null,
                tiempo_desde_cirugia: null,
                tratamiento: null,
                presente: null
            },
            endocarditis_valvula_protesica: {
                precoz_tardia: null,
                tratamiento: null,
                antibiotico: null,
                cultivo: null,
                presente: null
            },
            muerte: {
                causa: null,
                quirofano: null,
                uco: null,
                Hospitalización: null,
                presente: null,
                fecha: null
            }
        }
    }
]

const extracorporeal_circulation = [
    {
        rut: 25619081,
        hora_inicio_cirugia: null,
        hora_fin_cirugia: null,
        hora_inicio_cec: null,
        tiempo_clamp: null,
        tiempo_cec_total: null,
        cardioplegia: null,
        asistencia_ventricular_izquierda_postoperatoria: null,
        canulacion: {
            arterial: null,
            venosa: null
        },
        tiempo_arresto_circulatorio: {
            tecnica_correcion_ph: null,
            temperatura_descenso: null,
            tiempo_descenso: null,
            recalentamiento: null,
            tiempo_recalentamiento: null,
            tiempo_total_arresto_circulatorio: null
        },
        perfusion_cerebral: {
            anterograda: null,
            retrograda: null
        }
    }
]

const others = [
    {
        rut: 25619081,
        dias_uci: null,
        dias_uti: null,
        dias_totales_hospitalizacion: null,
        dias_intubacion: null,
        drogras_vasoactivas: {
            tiene: false,
            tipo: null
        },
        ecocardiograma_postoperatorio: {
            fevi: null,
            cinesia_ventricular: null,
            protesis_valvular: null
        },
        control_postoperatorio: {
            dias_15: null,
            mes_1: null,
            mes_3: null
        }
    }
]

const surgical_protocols = [
    {
        rut: 25619081,
        notas_operatorias: null,
        primer_cirujano: null,
        fecha: null,
        otros_cirujanos: []
    }
]



module.exports = {
    patient,
    pathological_personal_history,
    coronary_angiography,
    transthoracic_echocardiogram,
    heart_surgery,
    extracorporeal_circulation,
    others,
    surgical_protocols
};