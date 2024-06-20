const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/login.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login',[
    check('email','Invalid email').isEmail(),
    check('password','Password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;