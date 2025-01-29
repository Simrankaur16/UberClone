const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    fullname:{
        firstname: {
            type: String,
            required: true,
            minlenght: [3, 'First name must be at least 3 character Long']

        },
        lastname: {
            type: String,
            minlenght: [3, 'First name must be at least 3 character Long']

        },
    },
    password:{
        type: String,
        require: true,
        select: false
    },
    email: {
        type: String,
        require: true,
    }, 
    socketId: {
         type: String
    }
    
})


userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
    
}

userSchema.statics.hashPassword = async function (password) {

    return await bcrypt.hash(password, 10)
    
}


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
