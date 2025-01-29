const express = require('express');
const router = express.Router();
const {body } = require('express-validator')
const userController = require('../controllers/userController')



router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min: 3}).withMessage(
        'First name must by least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must by at least 6 character long')

    

    ],
    userController.registerUser
)




module.exports = router;