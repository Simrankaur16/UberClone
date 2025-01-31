const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service')
const blackListToken = require('../models/blacklistToken')


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

module.exports.loginCaptain = async(req, res, next) => {

    const erros = validationResult(req);

    if(!erros.isEmpty()){
        return res.status(400).json({error: erros.array()})
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain) {
        return res.status(400).json({error: 
        "Invalid email or password"
        })
    }

    const isValidPassword = await captain.comparePassword(password);

    if(!isValidPassword){
        return res.status(400).json({error: "Invalid email or password"});
    }

    const token = captain.generateAuthToken();
    res.cookie('token',token);

    res.status(200).json({token, captain})





}

module.exports.getCaptainProfile = async(req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async(req,res, next) =>{
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    await blackListToken.create({token});

    res.clearCookie('token');
    res.status(200).json({message: 'Logout successfully'})
}