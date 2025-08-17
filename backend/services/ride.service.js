const rideModel = require('../models/ride.model');

const mapService = require('./maps.service');
const crypto = require('crypto')

async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await mapService.getDistanceAndTime(pickup, destination);
    const baseFare = {
        car : 3,
        motorcycle: 2
    };
    const perKmRate = {
        car:1.4,
        motorcycle: 0.8
    };
    const perMinuteRate = {
        car: 0.2,
        motorcycle: 0.1
    }
     console.log('Distance and time:', distanceTime);
    const fare = {
        car: Math.round(baseFare.car + ((distanceTime.distance.value/1000) * perKmRate.car) + ((distanceTime.duration.value/60) *  perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value/1000) * perKmRate.motorcycle) + ((distanceTime.duration.value/60)* perMinuteRate.motorcycle))

    };
    console.log('Fare calculated:', fare);

    return fare;
}

module.exports.getFare = getFare;

function getOtp(num){
     const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
     return otp;
}




module.exports.createRide =async ( { user, pickup, destination, vehicleType }) => {

    if(!user || !pickup || !destination || !vehicleType) {
         throw new Error("All fields are required");

    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user, pickup, destination, 
        otp: getOtp(6),
        fare: fare[vehicleType]
    })
     console.log('Ride created:', ride);
    return ride;
    

  

}


module.exports.confirmRide = async ( { rideId, captain }) => {

    if(!rideId) {
        throw new Error("Ride ID is required");
    }

    await rideModel.findOneAndUpdate(
        {
            _id: rideId,
        },{
            status: 'accepted',
            captain: captain._id
        }
    );

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');
    console.log('Ride confirmed:', ride);
    if(!ride) {
        throw new Error("Ride not found");
    }

    return ride;
    

}

module.exports.startRide = async ( { rideId, otp, captain }) => {

    if(!rideId || !otp) {
        throw new Error("Ride ID and OTP are required");
    }

    const ride = await rideModel.findOne({
        _id: rideId,
       
    }).populate('user').populate('captain').select('+otp');

    if(!ride) {
        throw new Error("Invalid ride ID or OTP");
    }

    if(ride.status !== 'accepted') {
        throw new Error("Ride is not accepted");
    }

    if(ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }


    await rideModel.findOneAndUpdate({
        _id: rideId,
        
    },{
        status: 'ongoing',
       
    })

    
    return ride;



}

module.exports.endRide = async ( { rideId, captain }) => {

    if(!rideId) {
        throw new Error("Ride ID is required");
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride) {
        throw new Error("Invalid ride ID");
    }

    if(ride.status !== 'ongoing') {
        throw new Error("Ride is not ongoing");
    }

    await rideModel.findOneAndUpdate({
        _id: rideId,
       
    },{
        status: 'completed',
       
    })

    
    return ride;

}