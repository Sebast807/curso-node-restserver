const Role = require('../models/role.model');
const User = require( '../models/user.model' );

const isValidRole = async(role = '') => {
    const existRole = await Role.findOne( {role} );
    if ( !existRole ) {
        throw new Error(`Invalid role '${role}'`);
    }
}

const existEmail = async(email = '') => {
    const emailExist = await User.findOne( {email} );
    if( emailExist ){
        throw new Error( `The email '${email}' already exists`);
    }
}

const existUserById = async (id) => {
    const existUser = await User.findById( id );
    if( !existUser ){
        throw new Error(`The id ${ id } doesn't exists`);
    }
}

module.exports = {
    isValidRole,
    existEmail,
    existUserById
}