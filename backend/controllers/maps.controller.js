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