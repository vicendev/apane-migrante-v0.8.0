const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let estadosValidos = {
    values: ['CONSULTADO', 'PROCESO', 'FINALIZADO'],
    message: '{VALUE} no es un key válido'
};

let Schema = mongoose.Schema;

let tramiteProgresoSchema = new Schema({
    
    tramiteCoreID: {
        type: String,
        unique: true,
        required: [true, 'El tramite core ID es requerido']
    },
    userID: {
        type: String,
        unique: true,
        required: [true, 'El user ID es requerido']
    },
    estado: {
        type: String,
        enum: estadosValidos,
        required: [true, 'El estado es requerido']
    },
    fase: {
        type: Number,
        required: [true, 'La fase es requerida']
    },
    opts: [{}],
    fechaCreacion: {
        type: String,
        required: [true, 'La fecha de creacion es requerida']
    },
    fechaActualizacion: {
        type: String,
        required: [true, 'La fecha de actualizacion es requerida']
    }
});

tramiteProgresoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } )

module.exports = mongoose.model( 'TramiteProgreso', tramiteProgresoSchema );