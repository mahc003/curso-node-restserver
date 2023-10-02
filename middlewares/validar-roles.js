const { request, response } = require("express")


const esAdminRole = ( req = request, res= response, next) =>{

    if(!req.usuarioAutenticado){
        return res.status(500).json({
            msg: 'No se ha validado el token antes de validar el role'
        });
    }

    const { rol, nombre } = req.usuarioAutenticado;

    if( rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `Usuario ${ nombre } no es Administrador`
        });
    }
    next();
}

const tieneRole = ( ...roles ) =>{
    return ( req = request, res= response, next) =>{

        if(!req.usuarioAutenticado){
            return res.status(500).json({
                msg: 'No se ha validado el token antes de validar el role'
            });
        }

        if(!roles.includes( req.usuarioAutenticado.rol )){
            return res.status(401).json({
                msg: `El servicio requiere que el usuario tenga uno de estos roles: ${ roles }`
            });
        }

        next();
    }
}

module.exports ={
    esAdminRole,
    tieneRole
}