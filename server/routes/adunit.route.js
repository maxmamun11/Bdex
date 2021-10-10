const express = require('express');
const app = express();
const adUnitRoutes = express.Router();

const AdUnit = require('../models/AdUnit');

adUnitRoutes.route('/add').post(function (req, res){
    let adUnit = new AdUnit(req.body);
    adUnit.save()
    .then(item => {
        res.status(200).json({'adUnit': 'AdUnit added successfully'});
        console.log(item)
    })
    .catch(err => {
        res.status(400).send('Unable to save to database');
        console.log(err)
    });
});