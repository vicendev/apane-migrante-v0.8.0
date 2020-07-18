const express = require('express');

const { verificarToken } = require('../middleware/authentication');

const app = express();
const TramiteProgreso = require('../models/tramiteprogreso');


app.get('', (req, res) => {

    TramiteProgreso.find()
        .exec( (err, tramiteProgresos) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteProgresos
            });
        });
});

app.get('byUser/:userID', (req, res) => {

    const USERID = req.params.userID;

    TramiteProgreso.find( { userID: USERID } )
        .exec( (err, tramiteProgreso) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteProgreso
            });
        });
});

app.get('/byUserCoreID/:userID/:tramiteCoreID', (req, res) => {

    const USERID = req.params.userID;
    const TRAMITECOREID = req.params.tramiteCoreID;

    TramiteProgreso.find( { userID: USERID, tramiteCoreID: TRAMITECOREID } )
        .exec( (err, tramiteProgreso) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteProgreso
            });
        });
});

app.get('/byUserID/:userID/', (req, res) => {

    const USERID = req.params.userID;

    TramiteProgreso.find( { userID: USERID } )
        .exec( (err, tramiteProgresos) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteProgresos
            });
        });
});

app.post('', (req, res ) => {

    let body = req.body;
    
    let tramiteProgreso = new TramiteProgreso({
        tramiteCoreID: body.tramiteCoreID,
        userID: body.userID,
        estado: body.estado,
        fase: body.fase,
        opts: body.opts,
        fechaCreacion: new Date().toLocaleString(),
        fechaActualizacion: new Date().toLocaleString()
    });

    tramiteProgreso.save( (err, tramiteProgresoDB) => {

        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            tramiteProgreso: tramiteProgresoDB
        });
    });
});

app.put('/:id', (req, res) => {

    const ID = req.params.id
    let body = req.body;

    TramiteProgreso.findById( ID, (err, tramiteProgresoDB) => {

        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if ( !tramiteProgresoDB ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        tramiteProgresoDB.tramiteCoreID = body.tramiteCoreID;
        tramiteProgresoDB.userID = body.userID;
        tramiteProgresoDB.estado = body.estado;
        tramiteProgresoDB.fase = body.fase;
        tramiteProgresoDB.opts = body.opts;
        tramiteProgresoDB.fechaCreacion = body.fechaCreacion;
        tramiteProgresoDB.fechaActualizacion = new Date().toLocaleString();

        tramiteProgresoDB.save( (err, tramiteProgresoGuardado) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                tramiteProgreso: tramiteProgresoGuardado
            });
        });
    });
    
});

module.exports = app;