const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: { type: String },
    available: { type: String },
    region: { type: String },
    image: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Crop', CropSchema);
