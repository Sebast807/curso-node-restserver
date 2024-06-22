const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/login.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'Google token is required').not().isEmpty(),
    validateFields
], googleSignIn);


router.use('*', (req, res) => {
    res.status(404).json({
        msg: 'Not found'
    })
})

module.exports = router;