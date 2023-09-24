const { Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validator');
const { rolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', usuariosGet ) // usuariosGet no se llama como funcion si no se pasa por referencia

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( rolValido ),
    validarCampos
] ,usuariosPut)

router.post('/', [//middlewares de validacion
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'El password debe tener almenos 6 letras').isLength({ min: 6}),
    //check('rol', 'No es un rol válido/permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( rolValido ),// es lo mismo que check('rol').custom( (rol ) => rolValido( rol) )
    validarCampos
] , usuariosPost)

router.delete('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router;