const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const auth = require('../middleware/auth'); // Optional for viewing crops

// @route   GET api/crops
// @desc    Get all available crops for reference/marketplace
// @access  Public
router.get('/', async (req, res) => {
    try {
        const crops = await Crop.find().sort({ createdAt: -1 });
        res.json(crops);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/crops/seed
// @desc    Seed initial crops data (Developer utility)
// @access  Public (for easy setup)
router.post('/seed', async (req, res) => {
    try {
        const count = await Crop.countDocuments();
        if (count > 0) {
            return res.json({ msg: 'Crops already seeded' });
        }

        const initialCrops = [
            { name: 'Organic Wheat', season: 'Winter', description: 'High quality organic wheat from North Plains.', price: '₹28,000/ton', available: '500 tons', region: 'North Plains', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Sweet Corn', season: 'Summer', description: 'Fresh sweet corn, perfect for processing.', price: '₹16,000/ton', available: '1200 tons', region: 'Midwest Valley', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Soybeans', season: 'Spring', description: 'Premium grade soybeans rich in protein.', price: '₹36,000/ton', available: '800 tons', region: 'Eastern Highlands', image: 'https://plus.unsplash.com/premium_photo-1675237625686-21888de877bf?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Potatoes', season: 'Fall', description: 'Starchy potatoes suitable for chips and fries.', price: '₹22,000/ton', available: '2000 tons', region: 'Idaho Basin', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Tomatoes', season: 'Summer', description: 'Red ripe tomatoes, locally grown.', price: '₹25/kg', available: '300 tons', region: 'Sunny South', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Rice', season: 'Monsoon', description: 'Aromatic basmati rice.', price: '₹32,000/ton', available: '1500 tons', region: 'Delta Region', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300&h=200' },
        ];

        // Note: The original Crop schema might need updates to hold 'price', 'region', 'image', 'available'
        // I will first create basic crops. 
        // IMPORTANT: The current Model only has name, season, description.
        // I should update the model in the next step to support these fields. For now, this is a placeholder.
        await Crop.insertMany(initialCrops);

        res.json({ msg: 'Crops seeded successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/crops/reset
// @desc    Force reset/seed crops data
// @access  Public
router.post('/reset', async (req, res) => {
    try {
        await Crop.deleteMany({});

        const initialCrops = [
            { name: 'Organic Wheat', season: 'Winter', description: 'High quality organic wheat from North Plains.', price: '₹28,000/ton', available: '500 tons', region: 'North Plains', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Sweet Corn', season: 'Summer', description: 'Fresh sweet corn, perfect for processing.', price: '₹16,000/ton', available: '1200 tons', region: 'Midwest Valley', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Soybeans', season: 'Spring', description: 'Premium grade soybeans rich in protein.', price: '₹36,000/ton', available: '800 tons', region: 'Eastern Highlands', image: 'https://plus.unsplash.com/premium_photo-1675237625686-21888de877bf?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Potatoes', season: 'Fall', description: 'Starchy potatoes suitable for chips and fries.', price: '₹22,000/ton', available: '2000 tons', region: 'Idaho Basin', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Tomatoes', season: 'Summer', description: 'Red ripe tomatoes, locally grown.', price: '₹25/kg', available: '300 tons', region: 'Sunny South', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300&h=200' },
            { name: 'Rice', season: 'Monsoon', description: 'Aromatic basmati rice.', price: '₹32,000/ton', available: '1500 tons', region: 'Delta Region', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300&h=200' },
        ];

        await Crop.insertMany(initialCrops);
        res.json({ msg: 'Crops reset successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
