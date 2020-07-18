const express = require('express');

const Usuario = require('../models/usuario');
const { verificarToken } = require('../middleware/authentication')

const app = express();


/**
 * Obtener usuarios
 */
app.get('/usuario', (req, res) => {

    let filtro = { estado: true };

    let desde  = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find( filtro, 'nombre email role estado google facebook img' )
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios ) => {
                
                if ( err ) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count( filtro, (err, conteo ) => {

                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    });
                });

            });
});


app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    let cambioEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usuarioBorrado) => {

        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if ( !usuarioBorrado ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
});

module.exports = app;