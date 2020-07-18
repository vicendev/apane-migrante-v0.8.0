const express = require('express');

const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const Usuario = require('../models/usuario');

const app = express();

// Configuraciones de Google

async function verify ( token ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

// Verificar si usuario es google y/o registrar en base de datos
app.post('/google', async (req, res) => {

    let token = req.body.idToken

    let googleUser = await verify( token )
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

module.exports = app;