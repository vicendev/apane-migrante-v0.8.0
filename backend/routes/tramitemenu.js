const express = require('express');

const app = express();
const TramiteMenu = require('../models/tramitemenu');


app.get('', (req, res) => {

    TramiteMenu.find()
        .exec( (err, tramiteMenus) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteMenus
            });
        });
})

app.get('/:menuID', (req, res) => {

    const MENUID = req.params.menuID

    TramiteMenu.find( { menuID: MENUID } )
        .exec( (err, tramiteMenus) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteMenus
            });
        });
});

app.get('/privateID/:id', (req, res) => {

    const ID = req.params.id

    TramiteMenu.find( { _id: ID } )
        .exec( (err, tramiteMenu) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteMenu
            });
        });

})

app.get('/firstItem/:menuID', (req, res) => {

    const MENUID = req.params.menuID

    TramiteMenu.findOne( { menuID: MENUID } )
        .exec( (err, tramiteMenu) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteMenu
            });
        });
})

app.post('', (req, res) => {

    let body = req.body;

    let tramiteMenu = new TramiteMenu({
        titulo: body.titulo,
        menuID: body.menuID,
        submenu: body.submenu,
        fechaCreacion: new Date().toLocaleString(),
        fechaActualizacion: new Date().toLocaleString()
    });

    tramiteMenu.save( (err, tramiteMenuDB) => {

        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            tramiteMenu: tramiteMenuDB
        });
    });
});

module.exports = app;