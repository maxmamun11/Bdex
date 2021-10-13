
const express = require('express');
const app = express();
const advertiserRoutes = express.Router();

// Require Advertiser model in our routes module
let Advertiser = require('../models/Advertiser');

// Defined store route
advertiserRoutes.route('/add').post(function (req, res) {
  let advertiser = new Advertiser(req.body);
  advertiser.save()
    .then(advertiser => {
      res.status(200).json({'Advertiser': 'Advertiser has been added successfully'});
      console.log(advertiser);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    console.log(err);
    });
});

// Defined get data(index or listing) route
advertiserRoutes.route('/').get(function (req, res) {
  Advertiser.find(function (err, advertisers){
    if(err){
      console.log(err);
    }
    else {
      res.json(advertisers);
    }
  });
});

// Defined edit route
advertiserRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Advertiser.findById(id, function (err, advertiser){
      res.json(advertiser);
  });
});

//  Defined update route
advertiserRoutes.route('/update/:id').post(function (req, res) {
  Advertiser.findById(req.params.id, function(err, advertiser) {
    if (!advertiser)
      res.status(404).send("Record not found");
    else {
      advertiser.brands_Products = req.body.brands_Products;
      advertiser.product = req.body.product;
      advertiser.category = req.body.category;
      advertiser.media_Owner = req.body.media_Owner;
      advertiser.sub_Category = req.body.sub_Category;
      advertiser.picture = req.body.picture;
      advertiser.size_Height = req.body.size_Height;
      advertiser.size_Width = req.body.size_Width;
      advertiser.panel = req.body.panel;
      advertiser. unit = req.body. unit;
      advertiser.format = req.body.format;
      advertiser.environment = req.body.environment;
      advertiser.location_Address = req.body.location_Address;
      advertiser.area = req.body.area;
      advertiser.state = req.body.state;
      advertiser.region = req.body.region;
      advertiser.country = req.body.country;
      advertiser.q1_RM = req.body.q1_RM;
      advertiser.q2_RM = req.body.q2_RM;
      advertiser.q3_RM = req.body.q3_RM;
      advertiser.q4_RM = req.body.q4_RM;
      advertiser.total_RM = req.body.total_RM;
     

      advertiser.save().then(advertiser => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
advertiserRoutes.route('/delete/:id').get(function (req, res) {
    Advertiser.findByIdAndRemove({_id: req.params.id}, function(err, advertiser){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


advertiserRoutes.get('/maxproducts', function(req, res){
    Advertiser.aggregate([
        {
            '$group': {
                '_id': '$_id', 
                'product': {
                    '$first': '$product'
                }, 
                'totoal': {
                    '$avg': '$total_RM'
                }
            }
        }, {
            '$sort': {
                'totoal': -1
            }
        }, {
            '$limit': 5
        }
    ],  function(err, maXproduct){
        if(err) return next (err);
        res.json(maXproduct)
      })
})

advertiserRoutes.get('/maxCategory', function(req, res){
    Advertiser.aggregate([
        {
            '$group': {
                '_id': '$_id', 
                'category': {
                    '$first': '$category'
                }, 
                'overalCategoryExpend': {
                    '$avg': '$total_RM'
                }
            }
        }, {
            '$sort': {
                'overalCategoryExpend': -1
            }
        }, {
            '$limit': 5
        }
    ],  function(err, maxCategory){
        if(err) return next (err);
        res.json(maxCategory)
      })
})
advertiserRoutes.get('/maxFormat', function(req, res){
    Advertiser.aggregate([
        {
            '$group': {
                '_id': '$_id', 
                'category': {
                    '$first': '$category'
                }, 
                'overalFormatExpend': {
                    '$avg': '$total_RM'
                }
            }
        }, {
            '$sort': {
                'overalFormatExpend': -1
            }
        }, {
            '$limit': 5
        }
    ],  function(err, maxFormat){
        if(err) return next (err);
        res.json(maxFormat)
      })
})


module.exports = advertiserRoutes;