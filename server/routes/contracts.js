const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contract = require('../models/Contract');
const User = require('../models/User');

// @route   POST api/contracts
// @desc    Create a contract
// @access  Private (Buyer only)
router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'buyer') {
            return res.status(403).json({ msg: 'Not authorized to create contracts' });
        }

        const { cropName, quantity, pricePerUnit, duration } = req.body;

        const newContract = new Contract({
            cropName,
            quantity,
            pricePerUnit,
            duration,
            buyer: req.user.id,
            status: 'open'
        });

        const contract = await newContract.save();
        res.json(contract);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/contracts
// @desc    Get all contracts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        let contracts;
        if (user.role === 'buyer') {
            // Buyer sees contracts they created
            contracts = await Contract.find({ buyer: req.user.id }).sort({ createdAt: -1 });
        } else {
            // Farmer sees all open contracts OR contracts they accepted
            contracts = await Contract.find({
                $or: [
                    { status: 'open' },
                    { farmer: req.user.id }
                ]
            }).sort({ createdAt: -1 });
        }
        res.json(contracts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/contracts/:id
// @desc    Get contract by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ msg: 'Contract not found' });
        }
        res.json(contract);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Contract not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/contracts/:id/accept
// @desc    Accept a contract
// @access  Private (Farmer only)
router.put('/:id/accept', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'farmer') {
            return res.status(403).json({ msg: 'Only farmers can accept contracts' });
        }

        let contract = await Contract.findById(req.params.id);
        if (!contract) {
            return res.status(404).json({ msg: 'Contract not found' });
        }

        if (contract.status !== 'open') {
            return res.status(400).json({ msg: 'Contract is not available' });
        }

        contract.farmer = req.user.id;
        contract.status = 'accepted';

        await contract.save();
        res.json(contract);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
