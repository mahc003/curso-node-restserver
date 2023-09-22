const { response, request } = require('express');

const usuariosGet = (req = request, res = response ) => {

    const { q, nombre = "No Name", key} = req.query;

    res.json({
        msg: 'API get - Controller',
        q,
        nombre,
        key
    })
}

const usuariosPost = (req, res = response ) => {

    const { nombre, edad} = req.body;
    res.json({
        msg: 'API post - Controller',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response ) => {
    const id = req.params.id;
    res.json({
        msg: 'API put - Controller',
        id
    })
}

const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'API patch - Controller'
    })
}

const usuariosDelete = (req, res = response ) => {
    res.json({
        msg: 'API delete - Controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}