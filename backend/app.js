const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')
const connectToDB = require('./db/db')
const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/caption.route')

connectToDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('Hello world');

});

app.use('/users', userRoutes)
app.use('/captain', captainRoutes)
app.use(cookieParser());

module.exports  = app;