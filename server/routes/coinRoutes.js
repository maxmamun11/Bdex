const express = require('express');
const app = express();
const coinRoutes = express.Router();

const Coin = require('../models/Coin');

// Create 
coinRoutes.route('/add').post(function (req, res){
    let coin = new Coin(req.body);
    coin.save()
    .then(item => {
        res.status(200).json({'coin': 'Coin added successfully'});
        console.log(item)
    })
    .catch(err => {
        res.status(400).send('Unable to save to database');
        console.log(err)
    });
});

//Read
coinRoutes.route('/').get(function(req, res){
    Coin.find(function(err, coins){
        if(err){
            console.log(err)
        } else {
            res.json(coins);
        }
    });
});


// Get single id read
coinRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    Coin.findById(id, function (err, coin){
        res.json(coin);   
    });
});




// Updated 
coinRoutes.route('/update/:id').post(function(req, res){
    Coin.findById(req.params.id, function (err, coin){
        if (!coin)
        return next (new Error('Could not load Document'));
        else {
            coin.name = req.body.name;
            coin.price = req.body.price;
            
            coin.save()
            .then(coin => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("Unable to update the database");
            });
        }
        
    });
});

// Delete
coinRoutes.route('/delete/:id').get(function(req, res){
    let id = req.params.id;
    Coin.findByIdAndRemove({_id: req.params.id}, function (err, coin){
        if(err) res.json(err);       
         else res.json('Successfully removed');   
    });
});





module.exports = coinRoutes ;