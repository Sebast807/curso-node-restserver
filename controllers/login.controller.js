const { response, request } = require('express');

const { compareHash } = require('../helpers/bcrypt');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generateJWT');


const login = async (req = request, res = response) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    
    //Verificar si el email existe
    if ( !user ) {
        return res.status(400).json({
            msg: 'User do not exists'
        });
    }

    //Verificar si el usuario esta activo
    if( !user.status ){
        return res.status(404).json({
            msg: 'Not found'
        });
    }

    //Verificar la contraseña
    const validPassword = compareHash( password, user.password);

    if(!validPassword){
        return res.status(400).json({
            msg: 'Invalid Credentials'
        })
    }

  
    //Generar el JWT
   const token = await generateJWT( user.id );
    
    try {
        res.json({
            msg: 'Login ok',
            user,
            token
        });

    } catch (error) {
        return res.tatus(500).json({
            msg: `Error: contact with support ${error}`
        });
    }
}

module.exports = {
    login
}