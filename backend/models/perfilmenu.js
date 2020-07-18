const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let perfilMenuSchema = new Schema ({
    titulo: {
        type: String,
        unique: true,
        required: [true, 'El titulo es requerido']
    },
    fechaCreacion: {
        type: String,
        required: [true, 'La fecha de creación es requerida']
    },
    fechaActualizacion: {
        type: String,
        required: [true, 'La fecha de actualizacion es requerida']
    }
})

perfilMenuSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } );

module.exports = mongoose.model( 'PerfilMenu', perfilMenuSchema );