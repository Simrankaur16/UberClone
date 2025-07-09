const rideModel = require('../models/ride.model');

const mapService = require('./maps.service');


async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
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

    const fare = {
        car: baseFare.car + (distanceTime.distance * perKmRAte.auto) + (distanceTime.time )+ (perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distanceTime.distance * perKmRate.motorcycle) + (distanceTime.time * perMinuteRate.motorcycle)

    };
    console.log('Fare calculated:', fare);

    return fare;
}

module.exports.createRide =async ( { user, pickup, destination, vehicleType }) => {

    if(!user || !pickup || !destination || !vehicleType) {
         throw new Error("All fields are required");

    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user, pickup, destination, 
        fare: fare[vehicleType]
    })

    return ride;

  

}
