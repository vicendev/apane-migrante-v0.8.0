const express = require('express');

const app = express();
const Contenido = require('../models/contenido');


app.get('', (req, res) => {

    Contenido.find()
        .exec( (err, contenidos) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                contenidos
            });
        });
});

app.get('/:menuID', (req, res) => {

    const MENUID = req.params.menuID;

    Contenido.find( { menuID: MENUID } )
        .exec( (err, contenido) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                contenido
            });
        });
});

app.post('', (req, res) => {

    let body = req.body;

    let contenido = new Contenido({
        key: body.key,
        menuID: body.menuID,
        titulo: body.titulo,
        fechaCreacion: new Date().toLocaleString(),
        fechaActualizacion: new Date().toLocaleString()
    });

    contenido.save( (err, contenidoDB) => {

        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            contenido: contenidoDB
        });
    });
});

module.exports = app;