const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Advertiser = new Schema({
    brands_Products: {
        type: String
    },
    product: {
        type: String
    },
    category: {
        type: String
    },
    media_Owner: {
        type: String
    },
    sub_Category: {
        type: String
    },
    picture: {
        type: String
    },
    size_Height: {
        type: Number
    },
    size_Width: {
        type: Number
    },
    panel: {
        type: Number
    },
    unit: {
        type: Number
    },
    format: {
        type: String
    },
    environment: {
        type: String
    },
    location_Address: {
        type: String
    },
    area: {
        type: String
    },
    state: {
        type: String
    },
    region: {
        type: String
    },
    country: {
        type: String
    },
    q1_RM: {
        type: Number
    },
    q2_RM: {
        type: Number
    },
    q3_RM: {
        type: Number
    },
    q4_RM: {
        type: Number
    },
    total_RM: {
        type: Number
    }
},{ timestamps: true })


module.exports = mongoose.model('Advertiser', Advertiser);