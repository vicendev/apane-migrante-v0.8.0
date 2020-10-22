const express = require('express');

const jwt = require('jsonwebtoken');
const axios = require('axios'); 

const {OAuth2Client} = require('google-auth-library');
const clientGoogle = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);
const clienteFacebook = new OAuth2Client(process.env.CLIENT_FB_ID);

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const app = express();

// Configuraciones de Google

async function verifyGoogle ( token ) {
    const ticket = await clientGoogle.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_GOOGLE_ID
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

// Configuraciones de Facebook

async function verifyFacebook( token ) {

    const data = await axios.get(`https://graph.facebook.com/me?access_token=${encodeURIComponent(token)}`).
        then(res => res.data);

    return {
        data
    }
}

// Verificar si usuario es google y/o registrar en base de datos
app.post('/google', async (req, res) => {

    let token = req.body.idToken

    let googleUser = await verifyGoogle( token )
        .catch( e => {
            return res.status(403).json({
                ok: false,
                err: e
            });
        });

    Usuario.findOne( { email: googleUser.email }, (err, usuarioDB) => {

        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if ( usuarioDB ) {

            if ( usuarioDB.facebook ) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Este correo se registró con Facebook, favor usar esa autenticación'
                    }
                });

            } else if ( usuarioDB.google ) {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN } );

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                    expiresIn: 172800 // 48hrs menos tres 000, luego se multiplica en el front * 1000
                });
            }
        } else {
            // Si el usuario no existe en la Base de Datos
            let usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = '<(0_0<)';

            usuario.save( (err, usuarioDB) => {

                if ( err ) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                //console.log(usuarioDB)

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN});

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                    expiresIn: 172800 // 48hrs menos tres 000, luego se multiplica en el front * 1000
                });
            });

        }

    });
});

// Verificar si usuario es facebook y/o registrar en base de datos
app.post('/facebook', async (req, res) => {

    let token = req.body.idToken

    let facebookUser = await verifyFacebook( token )
        .catch( e => {
            return res.status(403).json({
                ok: false,
                err: e
            });
        });

    let email = '';

    if ( !facebookUser.data.email ) {
        email = facebookUser.data.id + '@apanemigrante.cl'
    } else {
        email = facebookUser.data.email
    }

    Usuario.findOne( {email: email}, (err, usuarioDB) => {

        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if ( usuarioDB ) {
            if ( usuarioDB.google ) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Este correo se registró con Google, favor usar esa autenticación'
                    }
                });
            } else if ( usuarioDB.facebook ) {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                    expiresIn: 172800
                })
            }
        } else {
            // Si el usuario no existe en la base de datos
            let usuario = new Usuario();

            usuario.nombre = facebookUser.data.name;
            usuario.email = email;
            usuario.img = req.body.img;
            usuario.facebook = true;
            usuario.password = '<(0_0<)';

            usuario.save( (err, usuarioDB) => {

                if ( err ) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                    expiresIn: 172800
                });
            });
        }
    });

});

// Ingresar como usuario invitado a la página, retornando un token especial
app.post('/invitado', async (req, res) => {

    let usuarioInvitado = new Usuario ();

    usuarioInvitado.nombre = 'Invitado';
    usuarioInvitado.email = 'Invitado';
    usuarioInvitado.img = 'Invitado';
    usuarioInvitado.estado = false;

    let token = jwt.sign({
        usuario: usuarioInvitado 
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN_INVITADO });

    return res.json({
        ok: true,
        usuario: usuarioInvitado,
        token,
        expiresIn: 172800
    });
    
});


module.exports = app;