const { response } = require('express');

const isAdminRole = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not admin`
        })
    }

    next();
}

const hasARole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token'
            });
        }

        if (!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `${req.user.name} has not a role.`
            });
        }
        
        next();
    }

}

module.exports = {
    isAdminRole,
    hasARole
}
