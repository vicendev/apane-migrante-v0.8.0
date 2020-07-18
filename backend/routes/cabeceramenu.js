const express = require('express');
const multer = require('multer');

const { verificarToken } = require('../middleware/authentication');

const app = express();
const CabeceraMenu = require('../models/cabeceramenu');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const url = req.get('host');
        let repository = "";

        if ( url == 'localhost:3000')
        {
            repository = "backend/images/cabeceramenu"
        } else {
            repository = "images/cabeceramenu"
        }

        const isValid  = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null;
        }
        cb(error, repository);
    },
    filename: (req, file, cb) =>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
});

app.get('', (req, res) => {

    CabeceraMenu.find()
        .exec( (err, cabeceramenus) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                cabeceramenus
            });
        });
});

app.get('/:menuID', (req, res) => {

    const MENUID = req.params.menuID;

    CabeceraMenu.find( { menuID: MENUID } )
        .exec( (err, cabeceraMenu) => {

            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                cabeceraMenu
            });
        });
});

app.post('', multer({storage: storage}).any(), (req, res ) => {

    const url = req.protocol + "://" + req.get("host");
    let body = req.body;

    let cabeceramenu = new CabeceraMenu({
        titulo: body.titulo,
        menuID: body.menuID,
        //imgPath: `${url}/images/cabeceramenu/${req.file.filename}`,
        imgPath: url + '/images/cabeceramenu/' + req.files[0].filename,
        iconPath: url + '/images/cabeceramenu/' + req.files[1].filename,
        fechaCreacion: new Date().toLocaleString(),
        fechaActualizacion: new Date().toLocaleString()
    });

    cabeceramenu.save( (err, cabeceramenuDB) => {
        
        if ( err ) {

            console.log(err)
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            cabeceramenu: cabeceramenuDB
        });
    });
});

module.exports = app;