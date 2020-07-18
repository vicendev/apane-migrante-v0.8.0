const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let cabeceraMenuSchema = new Schema({

    titulo: {
        type: String,
        unique: true,
        required: [true, 'El título es requerido']
    },
    menuID: {
        type: String,
        unique: true,
        required: [true, 'El menu ID es requerido']
    },
    imgPath: {
        type: String,
        required: [true, 'La imagen es requerida']
    },
    iconPath: {
        type: String,
        required: [true, 'El icono es requerido']
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

cabeceraMenuSchema.plugin( uniqueValidator, {  message: '{PATH} debe ser único' } )

module.exports = mongoose.model( 'CabeceraMenu', cabeceraMenuSchema );