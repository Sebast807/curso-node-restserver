const bCrypt = require('bcryptjs');

const encrypt = (password = '') => {
    const salt = bCrypt.genSaltSync();
    return bCrypt.hashSync(password, salt);
}

const compareHash = (password = '', hash = '') => {
    return bCrypt.compareSync(password, hash);
}

module.exports = {
    encrypt,
    compareHash
}