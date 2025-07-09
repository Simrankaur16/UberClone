const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
         
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number, 
        required: true,
    }, 
    status: {
        type: String, 
        enum: ['pending', 'accepted', 'Ongoing','Cancelled', 'Completed'],
        default: 'pending',
    },
    duration: {
        type: Number,
    }, 
    distance: {
        type: Number
    },
    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,   
    }

})