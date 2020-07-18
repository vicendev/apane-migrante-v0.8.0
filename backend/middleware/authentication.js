const jwt = require('jsonwebtoken');

//====================
// Verificar Token
//====================

let verificarToken = ( req, res, next ) => {

    let token = req.get('Authorization'); // Token

    jwt.verify( token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

};

module.exports = {
    verificarToken
}