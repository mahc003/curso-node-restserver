const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-wt');

const login = async(req = request, res = response ) => {

    const {correo, password } = req.body;

    try{

        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            });
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password:false'
            });
        }
        
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: "Por favor contacte al administrador"
        });
    }
    
}




module.exports = {
    login
}