const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

// Agregar un key cuando se agregue contenido nuevo
let keyValidos = {
    values: ['JURIDICO.GENERAL', 'JURIDICO.IDENTIDAD.GENERAL', 'JURIDICO.IDENTIDAD.CARNET'],
    message: '{VALUE} no es un key válido'
};


let contenidoSchema = new Schema({
    
    key: {
        type: String,
        unique: true,
        enum: keyValidos
    },
    menuID: {
        type: String,
        unique: true,
        required: [true, 'El menu ID es requerido']
    },
    titulo: {
        type: String,
        required: [true, 'La titulo es requerida']
    },
    fechaCreacion: {
        type: String,
        required: [true, 'La fecha de creacion es requerida']
    },
    fechaActualizacion: {
        type: String,
        requred: [true, 'La fecha de actualizacion es requerida']
    }
})

contenidoSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } )

module.exports = mongoose.model( 'Contenido', contenidoSchema);