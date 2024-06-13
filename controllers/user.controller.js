const { response } = require('express');

const getUsers = (req, res = response) => {
    
    const query = req.query;

    const {q ='get user', nombre = 'anonymous', apikey} = req.query;

    if (!apikey) {
        res.status(403).json({
            message:'invalid key'
        })    
        return;
    }

    res.json({
        msg: 'get API - controller',
        nombre,
        q
    })
    // const {nombre = ""}

    // res.json({
    //     msg: 'get API - controller',
    //     query
    // });
}

const postUsers = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - controller',
        nombre,
        edad
    });
}

const putUsers = (req, res = response) => {

    const id = req.params.id;

    res.json({
        id,
        msg: 'put API - controller'
    });
}

const deleteUsers = (req, res = response) => {

    res.json({
        msg: 'delete API - controller',
        query
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