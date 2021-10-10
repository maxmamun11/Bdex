const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Coin = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
},{ timestamps: true})

module.exports = mongoose.model('Coin', Coin);

