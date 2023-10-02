const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "Debe indicar el token para la petición"
        })
    }

    try {
    
        const { uid }= jwt.verify( token , process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en db'
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario estado false'
            });
        }

        req.usuarioAutenticado = usuario;
    
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}



module.exports = {
    validarJWT
}