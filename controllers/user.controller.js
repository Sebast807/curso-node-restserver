const { response, request } = require('express');
const { encrypt } = require('../helpers/bcrypt');

const User = require('../models/user.model');

const getUsers = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const response = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(from)
            .limit(Number(limit))
    ]);

    const [count, users] = response

    res.json({
        msg: 'get API - controller',
        count,
        users
    });
}

const postUsers = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //Verificar si el correo existe

    //Encriptar la contraseña
    user.password = encrypt(password)
    //Guardar en DB
    await user.save();

    res.status(201).json({
        msg: 'User registered',
        user
    });
}

const putUsers = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    //TODO: validar contra base de datos
    if (password) {
        //Encriptar contraseña
        rest.password = encrypt(password);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        msg: 'put API - controller',
        user
    });
}

const deleteUsers = async (req, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false });

    const userAuth = req.user;

    res.json({
        msg: 'delete API - controller',
        id,
        user,
        userAuth
    });
}

const patchUsers = (req, res = response) => {
    res.json({
        msg: 'patchUsers API - controller'
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
};

