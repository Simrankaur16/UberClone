const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service')



module.exports.registerCaptain = async(req,res,next)=> {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});

    }

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainExist = await captainModel.findOne({email});
    if(isCaptainExist){
       return res.status(400).json({error: "Captain already exist"});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    //generating token for captain registration
    const token = captain.generateAuthToken();

    // return tokena and captain data
    res.status(200).json({token, captain})


}