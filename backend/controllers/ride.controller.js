const rideService = require('../services/ride.service');

const {validationResult} = require('express-validator'); // TO Check error for validdation  


module.exports.createRide = async  ( req, res )  => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { userId, pickup, destination, vehicleType} = req.body;

    try { 
        console.log('Creating ride with data:', {userId, pickup, destination, vehicleType});
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
        return res.status(201).json(ride);
    }catch (error) {
        console.error('Error creating ride:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }       
 }


 module.exports.getFare = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {pickup, destination} = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);

    }catch(error){
        
        return res.status(500).json({message: 'Internal server error'});
    }


 }


