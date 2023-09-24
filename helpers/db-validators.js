const Role = require('../models/role');
const Usuario = require('../models/usuario');

const rolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){//con el trow se lanza una excepcion de validacion personalizada para express, no la plaicaion en si
        throw new Error(`El rol ${ rol } no existe en base de datos`);
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo ${ correo } ya existe en base de datos`);
    }
} 

const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El usuario con id ${ id } no existe en base de datos`);
    }
} 
module.exports ={
    rolValido,
    emailExiste,
    existeUsuarioPorId
}