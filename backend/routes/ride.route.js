const express = require('express');
const router = express.Router();
const { body, query} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/create',authMiddleware.authUser,

 body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup location'),
 body('destination').isString().isLength({min:3}).withMessage('Invalid destination location'),
 body('vehicleType').isString().isIn(['car', 'motorcycle']).withMessage('Invalid vehicle type'),
 rideController.createRide

 


)

router.get('/get-fare', authMiddleware.authUser, 
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination'),  
    rideController.getFare
)

module.exports = router;