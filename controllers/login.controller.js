const { response, request } = require('express');

const { compareHash } = require('../helpers/bcrypt');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req = request, res = response) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });


    //Verificar si el email existe
    if (!user) {
        return res.status(400).json({
            msg: 'User do not exists'
        });
    }

    //Verificar si el usuario esta activo
    if (!user.status) {
        return res.status(404).json({
            msg: 'Not found'
        });
    }

    //Verificar la contraseña
    const validPassword = compareHash(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            msg: 'Invalid Credentials'
        })
    }


    //Generar el JWT
    const token = await generateJWT(user.id);

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


const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { email, name, img } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            // Tengo que crearlo
            const data = {
                name,
                email,
                password: 'nopassword',
                img,
                google: true,
                role: 'USER_ROLE'
            };

            user = new User(data);
            await user.save();
        }

        // Si el usuario en DB
        if (!user.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es válido'
        })

    }

}



module.exports = {
    login,
    googleSignIn
}
