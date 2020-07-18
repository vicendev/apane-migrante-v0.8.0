const express = require('express');

const app = express();
const PerfilMenu = require('../models/perfilmenu');


app.get('', (req, res) => {

    PerfilMenu.find()
        .exec( (err, perfilMenus) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                perfilMenus
            });
        });
});

app.post('', (req, res) => {

    let body = req.body;

    let perfilMenu = new PerfilMenu({
        titulo: body.titulo,
        fechaCreacion: new Date().toLocaleString(),
        fechaActualizacion: new Date().toLocaleString()
    });

    perfilMenu.save( (err, perfilMenuDB) => {

        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            perfilMenu: perfilMenuDB
        });
    });
});

module.exports = app;