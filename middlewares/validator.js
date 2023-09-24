
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) =>{//el middleware se llama cone l mismo onjeto req y response del server
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}


module.exports ={
    validarCampos
}