const rideService = require('../services/ride.service');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');


const {validationResult} = require('express-validator'); // TO Check error for validdation  
const rideModel = require('../models/ride.model');


module.exports.createRide = async  ( req, res )  => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { userId, pickup, destination, vehicleType} = req.body;

    try { 
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});

        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        console.log('Pickup coordinates:', pickupCoordinates);

        const captainInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2)

        console.log('Captains in radius:', captainInRadius);
        
        ride.otp = ""

         const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user');
        
         captainInRadius.map( captain => {
            console.log(captain, ride)
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })

        
    }catch (error) {
        console.error('Error creating ride:', error.message);
        return res.status(500).json({message: error.message});
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


