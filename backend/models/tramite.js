const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let keyValidos = {
    values: ['JURIDICO', 'LEGAL', 'SOCIAL', 'CULTURAL'],
    message: '{VALUE} no es un key válido'
};

let Schema = mongoose.Schema;

let tramiteSchema = new Schema({
    key:{
        type: String,
        unique: true,
        enum: keyValidos,
        required: [true, 'El key es requerido']
    },
    titulo: {
        type: String,
        unique: true,
        required: [true, 'El título es requerido']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida']
    },
    fechaCreacion: {
        type: String,
        required: [true, 'La fecha de creacion es requerida']
    },
    fechaActualizacion: {
        type: String,
        required: [true, 'La fecha de actualizacion es requerida']
    }
})

tramiteSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } )

module.exports = mongoose.model( 'Tramite', tramiteSchema );