const axios = require('axios');
const captainModel = require('../models/captain.model');


module.exports.getAddressCoordinates = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API; // Ensure this is set in your environment variables
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Geocoding failed: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
};


module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status == 'OK') {
            if (response.data.rows[0].elements[0].status == 'ZERO_RESULTS') {
                throw new Error('No route found');

            }

            return response.data.rows[0].elements[0];
        } else {
            throw new Error('unable to fetch distance and time');
        }
    }

    catch (error) {
        console.error('Error fetching distance and time:', error.message);
        throw error;

    }



}


module.exports.getSuggestions = async (input) => {


    if (!input) {
        throw new Error('query is required');
    }
    

    const apiKey = process.env.GOOGLE_MAPS_API;
     if (!apiKey) {
        throw new Error('Google Maps API key is missing');
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            console.error('Google Maps API error:', response.data);
            throw new Error('Unable to fetch suggestions')
        }
    } catch (error) {
        console.error('Maps service error:', error);
        console.error(error)
        throw error;
    }
}


module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {

    // radius is in kilometers

    const captain = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius/6371] // radius in kilometers
            }
        }
    });

    return captain;

}
