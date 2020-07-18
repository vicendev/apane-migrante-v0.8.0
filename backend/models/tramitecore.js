const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let keyValidos = {
    values: ['TRAMITE.CARNET'],
    message: '{VALUE} no es un key válido'
};

let Schema = mongoose.Schema;

let tramiteCoreSchema = new Schema({
    
    key: {
        type: String,
        unique: true,
        enum: keyValidos,
        required: [true, 'El key es requerido']
    },
    titulo: {
        type: String,
        unique: true,
        required: [true, 'El titulo es requerido']
    },
    numFases: {
        type: Number,
        required: [true, 'El numero de fases del tramite es requerido']
    },
    fechaCreacion: {
        type: String,
        required: [true, 'La fecha de creacion es requerida']
    },
    fechaActualizacion: {
        type: String,
        required: [true, 'La fecha de actualizacion es requerida']
    }
});

tramiteCoreSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } )

module.exports = mongoose.model( 'TramiteCore', tramiteCoreSchema );