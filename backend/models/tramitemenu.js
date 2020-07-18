const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let tramiteMenuSchema = new Schema ({
    titulo: {
        type: String,
        unique: true,
        required: [true, 'El titulo es requerido']
    },
    menuID: {
        type: String,
        required: [true, 'El id de menu es requerido']
    },
    submenu: {
        type: Boolean,
        required: [true, 'El submenu es requerido']
    },
    fechaCreacion: {
        type: String,
        required: [true, 'La fecha de creacion es requerida']
    },
    fechaActualizacion: {
        type: String,
        required: [true, 'la fecha de actualizacion es requerida']
    }
})

tramiteMenuSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } );

module.exports = mongoose.model( 'TramiteMenu', tramiteMenuSchema );