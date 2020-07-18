const express = require('express');

const { verificarToken } = require('../middleware/authentication');

const app = express();
const TramiteCore = require('../models/tramitecore');

app.get('', (req, res) => {

    TramiteCore.find()
        .exec( (err, tramiteCores) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteCores
            });
        });
});

app.get('/:key', (req, res) => {

    const KEY = req.params.key;

    TramiteCore.find( { key: KEY } )
        .exec( (err, tramiteCore) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteCore
            });
        });
});

app.get('/byID/:id', (req, res) => {

    const ID = req.params.id;

    TramiteCore.find( { _id: ID } )
        .exec( (err, tramiteCore) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteCore
            });
        });
});

app.post('', (req, res ) => {

    let body = req.body;

    let tramiteCore = new TramiteCore({
        key: body.key,
        titulo: body.titulo,
        numFases: body.numFases,
        fechaCreacion: new Date().toLocaleString(),
        fechaActualizacion: new Date().toLocaleString()
    });

    tramiteCore.save( (err, tramiteCoreDB) => {

        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            tramiteCore: tramiteCoreDB
        });
    });
});

module.exports = app;