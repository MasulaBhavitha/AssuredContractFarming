const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contract = require('../models/Contract');
const User = require('../models/User');

// @route   GET api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        let stats = {
            totalContracts: 0,
            activeContracts: 0,
            completedContracts: 0
        };

        if (user.role === 'buyer') {
            const contracts = await Contract.find({ buyer: req.user.id });
            stats.totalContracts = contracts.length;
            stats.activeContracts = contracts.filter(c => c.status !== 'completed').length;
            stats.completedContracts = contracts.filter(c => c.status === 'completed').length;
        } else {
            const contracts = await Contract.find({ farmer: req.user.id });
            stats.totalContracts = contracts.length;
            stats.activeContracts = contracts.filter(c => c.status === 'accepted').length;
            stats.completedContracts = contracts.filter(c => c.status === 'completed').length;
        }

        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
