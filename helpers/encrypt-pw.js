const bCrypt = require('bcryptjs');

const encrypt = (password = '') => {
    const salt = bCrypt.genSaltSync();
    return bCrypt.hashSync(password, salt);
}

module.exports = {
    encrypt
}