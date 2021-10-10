const express = require('express');
const app = express();
const businessRoutes = express.Router();

let Business = require('../models/Business');



// Create
businessRoutes.route('/add').post(function (req, res) {
    let business = new Business(req.body);
    business.save()
    .then(business => {
        res.status(200).json({'business': 'business in added successfully'});
         console.log(business)
    })
    .catch(err => {
        res.status(400).send('Unable to save to database');
    });
});


//Read
businessRoutes.route('/').get(function (req, res){
    Business.find(function (err, business){
        if(err){
            console.log(err)
        } else {
            res.json(business);
        }
    });
});



// Get single id read

businessRoutes.route('/edit/:id').get(function (req, res){
    let id = req.params.id;
    Business.findById(id, function (err, business){
        res.json(business);
    })
})


// Updated 

businessRoutes.route('update/:id').post(function(req, res){
    Business.findById(req.params.id, function (err, business){
        if (!business)
        return next (new Error('Could not load Document'));
        else {
            business.person_name = req.body.person_name;
            business.business_name = req.body.business_name;
            business.business_gst_number = req.body.business_gst_number;

            business.save()
            .then(business => {
                res.json('Update complete')
            })
            .catch(err => {
                res.status(400).send('Unable to update the database');
            });
            
        }
    });
});

businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});





module.exports = businessRoutes;