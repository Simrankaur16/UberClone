require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')
const connectToDB = require('./db/db')

const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/caption.route')
const mapsRoutes = require('./routes/maps.route');
const rideRoutes = require('./routes/ride.route');

connectToDB()
app.use(cors({
  origin: "https://ubercl.netlify.app/", 
  methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
  credentials: true
}));

app.use(express.json());d
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello world'); 

});

app.use('/users', userRoutes)
app.use('/captain', captainRoutes)

app.use('/maps', mapsRoutes)
app.use('/rides', rideRoutes)

module.exports  = app;