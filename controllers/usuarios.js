const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const filtro = { estado: true };

    const pUsuarios = Usuario.find(filtro)
            .skip(Number(desde))
            .limit( Number(limite) );

    const pTotal = Usuario.countDocuments(filtro);

    const [ total, usuarios ] = await Promise.all([//Procesar promesas de forma paralela. Await para esperar la resolucion de todas antes de continuar
        pTotal,//Promesa 1
        pUsuarios //Promesa 2
    ]);

    res.json({ 
        total, 
        usuarios
     });
}

const usuariosPost = async(req, res = response ) => {

    //const { google, ...resto } = req.body; desestructurar separando un elemnto y dejando el resto junto en un objeto
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //hash contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async(req, res = response ) => {
    const {id} = req.params;
    const { _id, password, google, correo, ...actualizar} = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        actualizar.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, actualizar );

    res.json(usuario);
}

const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'API patch - Controller'
    })
}

const usuariosDelete = async(req, res = response ) => {

    const { id } = req.params;

    //borar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}