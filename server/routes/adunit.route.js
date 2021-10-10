const express = require('express');
const app = express();
const adUnitRoutes = express.Router();


const AdUnit = require('../models/AdUnit');

// Create 
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

//Read
adUnitRoutes.route('/').get(function(req, res){
    AdUnit.find(function(err, adUnits){
        if(err){
            console.log(err)
        } else {
            res.json(adUnits);
        }
    })
})
// Get single id read
adUnitRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    AdUnit.findById(id, function (err, adUnit){
    res.json(adUnit);
    });
});


// Updated 
adUnitRoutes.route('/update/:id').post(function(req, res){
    AdUnit.findById(req.params.id, function(err, adUnit){
        if(!adUnit)
        return next (new Error('Could not load Document'));
        else {
            adUnit.unit_name = req.body.unit_name;
            adUnit.unit_price = req.body.unit_price;

            adUnit.save()
            .then(adUnit => {
                res.json('Update completed')
            });
        }
    });
})


adUnitRoutes.route('/delete/:id').get(function(req, res){
    let id = req.params.id;
    AdUnit.findByIdAndRemove({_id: req.params.id}, function (err, adUnit){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = adUnitRoutes;