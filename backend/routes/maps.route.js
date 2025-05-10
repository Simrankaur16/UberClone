const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const mapController = require('../controllers/maps.controller');
const {query} = require('express-validator')

router.get('/get-coordiantes', query('address').isString().isLength({min: 3}) 
,authMiddleware.authUser, mapController.getAddressCoordinates);


module.exports = router;
