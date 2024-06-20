const { Router } = require('express');
const { getUsers, postUsers, putUsers, deleteUsers, patchUsers } = require('../controllers/user.controller');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { isValidRole, existEmail, existUserById } = require('../helpers/db-validators');


const router = Router();


//Routes
router.get('/', getUsers);

router.post('/', [
    check('email').isEmail().withMessage('The email should not be empty')
        .custom(existEmail),

    check('name', 'The name should not be empty').not().isEmpty(),

    check('password').not().isEmpty().withMessage('The password should not be empty')
        .isLength({ min: 7 }).withMessage('The Password must be at least 7 characters'),
    // check('role', 'Invalid role').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('role').custom(isValidRole),

    validateFields
], postUsers);

router.put('/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom( existUserById ),
    validateFields
], putUsers);

router.delete('/:id',[
    check('id','Invalid ID'),
    check('id').custom( existUserById ),
    validateFields
], deleteUsers);

router.patch('/', patchUsers);

module.exports = router;



