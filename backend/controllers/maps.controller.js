const mapService = require('../services/maps.service');
const {validationResult} = require('express-validator');

module.exports.getAddressCoordinates = async (req, res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {address}  = req.query;

    try {
        const coordiantes = await mapService.getAddressCoordinates(address);
        res.status(200).json(coordiantes);
    }catch(error) {
        res.status(404).json({message: 'Corrdiantes not found '})
    }
}

module.exports.getDistanceAndTime = async( req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {input} = req.query; 
        const suggestions = await mapService.getSuggestions(input);
        res.status(200).json(suggestions);
        


    }catch(error) {
        res.status(404).json({message: 'Distance and time not found'})
    }
}


module.exports.getSuggestions = async(req, res, next) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        

        const {input} = req.query;
        const suggestions = await mapService.getSuggestions(input);
        res.status(200).json(suggestions);

    
    
}catch(error) {
        console.error('Maps controller error:', error);
        res.status(500).json({message: 'Suggestions not found', error: error.message})
    }

}


