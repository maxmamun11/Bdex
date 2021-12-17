
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
// max Top 5 category 2019
advertiserRoutes.get('/maxCategory', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2019'
            }
        }, {
            '$group': {
                '_id': '$category', 
                'Total': {
                    '$sum': '$total_RM'
                }
            }
        }, {
            '$sort': {
                'Total': -1
            }
        }, {
            '$limit': 10
        }
    
       
    ],  function(err, maXproduct){
        if(err) return next (err);
        res.json(maXproduct)
      })
})

// max Top 5 category 2020
advertiserRoutes.get('/maxCategoryt', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2020'
            }
        }, {
            '$group': {
                '_id': '$category', 
                'Total': {
                    '$sum': '$total_RM'
                }
            }
        }, {
            '$sort': {
                'Total': -1
            }
        }, {
            '$limit': 10
        }
    
       
    ],  function(err, maxCategoryT){
        if(err) return next (err);
        res.json(maxCategoryT)
      })
})
// Top 5 Advertiser/ brands_Products Q1 in 2019
advertiserRoutes.get('/maxQuater', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2019'
            }
        }, {
            '$group': {
                '_id': '$brands_Products', 
                'Q1': {
                    '$sum': '$q1_RM'
                }
            }
        }, {
            '$sort': {
                'Q1': -1
            }
        }, {
            '$limit': 10
        }        
    ],  function(err, maxCategory){
        if(err) return next (err);
        res.json(maxCategory)
      })
})
// Top 5 Advertiser/ brands_Products Q2 in 2019
advertiserRoutes.get('/maxQuatert', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2019'
            }
        }, {
            '$group': {
                '_id': '$brands_Products', 
                'Q2': {
                    '$sum': '$q2_RM'
                }
            }
        }, {
            '$sort': {
                'Q2': -1
            }
        }, {
            '$limit': 10
        }        
    ],  function(err, maxCategoryt){
        if(err) return next (err);
        res.json(maxCategoryt)
      })
})
// Top 5 Advertiser/ brands_Products Q1 in 2020
advertiserRoutes.get('/maxFormat', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2020'
            }
        }, {
            '$group': {
                '_id': '$brands_Products', 
                'Q1': {
                    '$sum': '$q1_RM'
                }
            }
        }, {
            '$sort': {
                'Q1': -1
            }
        }, {
            '$limit': 10
        }   
    ],  function(err, maxFormat){
        if(err) return next (err);
        res.json(maxFormat)
      })
})

// Top 5 Advertiser/ brands_Products Q2 in 2020
advertiserRoutes.get('/maxState', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2020'
            }
        }, {
            '$group': {
                '_id': '$brands_Products', 
                'Q2': {
                    '$sum': '$q2_RM'
                }
            }
        }, {
            '$sort': {
                'Q2': -1
            }
        }, {
            '$limit': 10
        }   
    ],  function(err, maxState){
        if(err) return next (err);
        res.json(maxState)
      })
})

// Top 10 Advertiser/ brands_Products Q1 in 2021
advertiserRoutes.get('/maxTwintyOne', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2021'            
            }
        }, {
            '$group': {
                '_id': '$brands_Products', 
                'Total': {
                    '$sum': '$total_RM'
                }
            }
        }, {
            '$sort': {
                'Total': -1
            }
        }, {
            '$limit': 10
        }   
    ],  function(err, maxTwintyOne){
        if(err) return next (err);
        res.json(maxTwintyOne)
      })
})
// Top 10 Advertiser/ brands_Products Q3 in 2021
advertiserRoutes.get('/maxTwintyOnet', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': '$brands_Products', 
                'Q3': {
                    '$sum': '$q3_RM'
                }
            }
        }, {
            '$sort': {
                'Q3': -1
            }
        }, {
            '$limit': 10
        }   
    ],  function(err, maxTwintyOnet){
        if(err) return next (err);
        res.json(maxTwintyOnet)
      })
})
// Top 10 Category in 2021
advertiserRoutes.get('/maxTwintyOnett', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': '$category', 
                'Total': {
                    '$sum': '$total_RM'
                }
            }
        }, {
            '$sort': {
                'Total': -1
            }
        }, {
            '$limit': 10
        }   
    ],  function(err, maxTwintyOnett){
        if(err) return next (err);
        res.json(maxTwintyOnett)
      })
})

//Stack for 3 quaters maxmamun 
advertiserRoutes.get('/maxTwintyOnettt', function(req, res){
    Advertiser.aggregate([
        
  {
    '$match': {
        'year': '2021'
    }
}, {
    '$group': {
        '_id': {
            'year': '$year'
        }, 
        'Q1': {
            '$sum': '$q1_RM'
        }, 
        'Q2': {
            '$sum': '$q2_RM'
        }, 
        'Q3': {
            '$sum': '$q3_RM'
        }
    }
}
         
    ],  function(err, maxTwintyOnettt){
        if(err) return next (err);
        res.json(maxTwintyOnettt)
      })
})
//Last requirment start from here
// Top 10 Category Q3 in 2021 
advertiserRoutes.get('/maxTwintyOnetttt', function(req, res){
    Advertiser.aggregate([ 
    {
        '$match': {
            'year': '2021'
        }
    }, {
        '$group': {
            '_id': '$category', 
            'Q3': {
                '$sum': '$q3_RM'
            }
        }
    }, {
        '$sort': {
            'Q3': -1
        }
    }, {
        '$limit': 10
    } 
    ],  function(err, maxTwintyOnetttt){
        if(err) return next (err);
        res.json(maxTwintyOnetttt)
      })
})
//Top 10 Category by format
advertiserRoutes.get('/maxTwintyOnetttta', function(req, res){
    Advertiser.aggregate([ 
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': {
                    'category': '$category', 
                    'format': '$format'
                }, 
                'Total': {
                    '$sum': '$total_RM'
                }
            }
        }, {
            '$sort': {
                'Total': -1
            }
        }, {
            '$limit': 10
        }
    ],  function(err, maxTwintyOnetttta){
        if(err) return next (err);
        res.json(maxTwintyOnetttta)
      })
})



//Q1 , Q2, Q3 combined stack Top 10 category by Format
advertiserRoutes.get('/maxTwintyOnetttq', function(req, res){
    Advertiser.aggregate([
        
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': {
                    'category': '$category', 
                    'format': '$format'
                }, 
                'Q1': {
                    '$sum': '$q1_RM'
                }, 
                'Q2': {
                    '$sum': '$q2_RM'
                }, 
                'Q3': {
                    '$sum': '$q3_RM'
                }
            }
        }, {
            '$sort': {
                'Q1': -1, 
                'Q2': -1, 
                'Q3': -1
            }
        }, {
            '$limit': 10
        }
    ],  function(err, maxTwintyOnetttq){
        if(err) return next (err);
        res.json(maxTwintyOnetttq)
      })
})


// Top 10 Category by format at  Q3 in 2021
advertiserRoutes.get('/maxTwintyOnef', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': {
                    'category': '$category', 
                    'format': '$format'
                }, 
                'Q3': {
                    '$sum': '$q3_RM'
                }
            }
        }, {
            '$sort': {
                'Q3': -1
            }
        }, {
            '$limit': 10
        } 
    ],  function(err, maxTwintyOnef){
        if(err) return next (err);
        res.json(maxTwintyOnef)
      })
})


//Top 10 Category by Environement
advertiserRoutes.get('/categoryByEnv', function(req, res){
    Advertiser.aggregate([ 
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': {
                    'category': '$category', 
                    'environment': '$environment'
                }, 
                'Total': {
                    '$sum': '$total_RM'
                }
            }
        }, {
            '$sort': {
                'Total': -1
            }
        }, {
            '$limit': 10
        }
    ],  function(err, categoryByEnv){
        if(err) return next (err);
        res.json(categoryByEnv)
      })
})



//Q1 , Q2, Q3 combined stack Top 10 category by Environment
advertiserRoutes.get('/maxTwityStack', function(req, res){
    Advertiser.aggregate([
        
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': {
                    'category': '$category', 
                    'Environment': '$environment'
                }, 
                'Q1': {
                    '$sum': '$q1_RM'
                }, 
                'Q2': {
                    '$sum': '$q2_RM'
                }, 
                'Q3': {
                    '$sum': '$q3_RM'
                }
            }
        }, {
            '$sort': {
                'Q1': -1, 
                'Q2': -1, 
                'Q3': -1
            }
        }, {
            '$limit': 10
        }
         
    ],  function(err, maxTwityStack){
        if(err) return next (err);
        res.json(maxTwityStack)
      })
})


// Top 10 Category by Environement at  Q3 in 2021
advertiserRoutes.get('/maxTwintyOneE', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': {
                    'category': '$category', 
                    'Environment': '$environment'
                }, 
                'Q3': {
                    '$sum': '$q3_RM'
                }
            }
        }, {
            '$sort': {
                'Q3': -1
            }
        }, {
            '$limit': 10
        } 
    ],  function(err, maxTwintyOneE){
        if(err) return next (err);
        res.json(maxTwintyOneE)
      })
})


//Top 10 Category by Region
advertiserRoutes.get('/categoryByReg', function(req, res){
    Advertiser.aggregate([ 
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': {
                    'category': '$category', 
                    'region': '$region'
                }, 
                'Total': {
                    '$sum': '$total_RM'
                }
            }
        }, {
            '$sort': {
                Total: -1
            }
        }, {
            '$limit': 10
        }
    ],  function(err, categoryByReg){
        if(err) return next (err);
        res.json(categoryByReg)
      })
})


// //Q1 , Q2, Q3 combined stack Top 10 category by Region
advertiserRoutes.get('/maxTwintyOneStack', function(req, res){
    Advertiser.aggregate([
        
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': {
                    'category': '$category', 
                    'Region': '$region'
                }, 
                'Q1': {
                    '$sum': '$q1_RM'
                }, 
                'Q2': {
                    '$sum': '$q2_RM'
                }, 
                'Q3': {
                    '$sum': '$q3_RM'
                }
            }
        }, {
            '$sort': {
                'Q1': -1, 
                'Q2': -1, 
                'Q3': -1
            }
        }, {
            '$limit': 10
        }
         
    ],  function(err, maxTwintyOneStack){
        if(err) return next (err);
        res.json(maxTwintyOneStack)
      })
})

// // Top 10 Category by Region at  Q3 in 2021
advertiserRoutes.get('/maxTwintyOneRegi', function(req, res){
    Advertiser.aggregate([
        {
            '$match': {
                'year': '2021'
            }
        }, {
            '$group': {
                '_id': {
                    'category': '$category', 
                    'Region': '$region'
                }, 
                'Q3': {
                    '$sum': '$q3_RM'
                }
            }
        }, {
            '$sort': {
                'Q3': -1
            }
        }, {
            '$limit': 10
        } 
    ],  function(err, maxTwintyOneRegi){
        if(err) return next (err);
        res.json(maxTwintyOneRegi)
      })
})


module.exports = advertiserRoutes;