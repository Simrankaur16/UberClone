const userModel  = require('../models/userModel')
const userService = require('../services/userService')
const {validationResult} = require ('express-validator')
const blacklistTokenModel = require('../models/blacklistToken') 

module.exports.registerUser = async(req, res, next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, password} = req.body;

    const userExist = await userModel.findOne({email})

    if(userExist){
        return res.status(400).json({message: 'user already exist'})
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();
     
   return  res.status(201).json({token, user});

}

module.exports.loginUser = async(req, res, next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password'); // whene find user then getting passord
    
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'})
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'})
    }
    
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token, user})

}

module.exports.getUserProfile = async(req, res, next) =>{
    res.status(200).json(req.user);
}

module.exports.logoutuser = async(req, res, next) => {
   
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token});
    res.clearCookie('token');

    res.status(200).json({message: 'Logout successfully'});  

}

