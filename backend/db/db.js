const mongoose = require('mongoose');

function connectToDB() {
    try{

    
    mongoose.connect(process.env.DB_CONNECT);
          
    console.log('Connected to DB')


    }catch(err){
        console.error('Error Connecting to DB', err
        )
    }
    
   }
    
    

module.exports = connectToDB;

