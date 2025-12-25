const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
    cropName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'accepted', 'completed'],
        default: 'open'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contract', ContractSchema);
