const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validateJWT = async (req, res, next) => {

    //leer de los headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token'
        })
    }

    try {

        //Extraer el payload del token
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        //leer el usuario correspondiente al uid
        const user = await User.findById(uid)
        
        if (!user) {
            return res.status(404).json({
                msg: 'invalid token - user do not exist on db'
            })
        }
        
        //verificar si el usuario.status es false
        if (!user.status) {
            return res.status(401).json({
                msg: 'token - invalido - status:false'
            })
        }


        req.user = user;

        next();

    } catch (error) {
        console.error('error', error);
        res.status(401).json({
            msg: 'invalid token'
        })
    }

}

module.exports = {
    validateJWT
}