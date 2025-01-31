const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller')
const auth = require('../middleware/auth.middleware')

router.post('/register', [
    body('email').isEmail().withMessage("Invalid email"),
    body('fullname.firstname').isLength({min: 3}).withMessage("firstname must by 3 character long"),
    body('password').isLength({min: 6}).withMessage("Password must by 6 Character long"),
    body('vehicle.color').isLength({min:3}).withMessage("Color must by 3 character long"),
    body('vehicle.plate').isLength({min: 3}).withMessage("Plate number must be at leaset 3 char long"),
    body('vehicle.capacity').isInt({min:1}).withMessage("Capacity must by 3 Character Long"),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle']).withMessage("Invalid vlalue")
    ],

    captainController.registerCaptain


)

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 character long")

],

captainController.loginCaptain


)


router.get('/profile', auth.authCaptain, captainController.getCaptainProfile) 

router.get('/logout', auth.authCaptain, captainController.logoutCaptain);

    


  


module.exports = router