const validFields = require('../helpers/db-validators');
const validJWT = require('../middlewares/validate-jwt');
const validRoles = require('../middlewares/validate-role');


module.exports = {
    ...validFields,
    ...validJWT,
    ...validRoles
}