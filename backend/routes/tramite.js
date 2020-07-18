const express = require('express');

const { verificarToken } = require('../middleware/authentication');

const app = express();
const Tramite = require('../models/tramite');


app.get('', (req, res) => {

    Tramite.find()
        .exec( (err, tramites) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramites
            });
        });
});

app.get('/:key', (req, res) => {

    const KEY = req.params.key;

    Tramite.find( { key: KEY } )
        .exec( (err, tramite) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramite
            });
        });
});


app.post('', (req, res ) => {

    let body = req.body;

    let tramite = new Tramite({
        key: body.key,
        titulo: body.titulo,
        descripcion: body.descripcion,
        fechaCreacion: new Date().toLocaleString(),
        fechaActualizacion: new Date().toLocaleString()
    });

    tramite.save( (err, tramiteDB) => {

        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            tramite: tramiteDB
        });
    });
});

module.exports = app;