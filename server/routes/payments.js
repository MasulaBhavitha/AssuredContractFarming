const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const crypto = require('crypto');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
const PHONEPE_HOST_URL = process.env.PHONEPE_HOST_URL || "https://api-preprod.phonepe.com/apis/pg-sandbox";

// @route   GET api/payments
// @desc    Get all payments
// @access  Public
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().sort({ createdAt: -1 });
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/payments/initiate
// @desc    Initiate PhonePe Payment (Standard Checkout)
// @access  Public
router.post('/initiate', async (req, res) => {
    const { amount, description } = req.body;
    const merchantTransactionId = "MT" + Date.now();
    const userId = "MUID" + Date.now(); // In real app, use req.user.id

    // 1. Create Payload
    const data = {
        merchantId: MERCHANT_ID,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: Number(amount) * 100, // paise
        redirectUrl: `http://localhost:5000/api/payments/callback/${merchantTransactionId}`, // Server Callback
        redirectMode: "POST", // PhonePe will POST directly to backend
        callbackUrl: `http://localhost:5000/api/payments/callback/${merchantTransactionId}`, // S2S callback
        mobileNumber: "9999999999", // Should be user's mobile
        paymentInstrument: {
            type: "PAY_PAGE"
        },
        message: description || "Payment for Crops"
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');

    // 2. Generate Checksum
    const stringToSign = payloadMain + "/pg/v1/pay" + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToSign).digest('hex');
    const checksum = sha256 + "###" + SALT_INDEX;

    try {
        // 3. Call PhonePe API
        const options = {
            method: 'post',
            url: `${PHONEPE_HOST_URL}/pg/v1/pay`,
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        const response = await axios(options);

        // Save initiating transaction as pending
        const newPayment = new Payment({
            transactionId: merchantTransactionId,
            amount: amount,
            description: description,
            status: 'pending'
        });
        await newPayment.save();

        // Return redirect URL to frontend
        res.json({
            url: response.data.data.instrumentResponse.redirectInfo.url,
            transactionId: merchantTransactionId
        });

    } catch (error) {
        console.error("PhonePe Init Error:", error.response ? error.response.data : error.message);
        res.status(500).send("Payment Initiation Failed");
    }
});

// @route   POST api/payments/callback/:txnId
// @desc    Handle PhonePe Callback/Redirect (Server to Server)
// @access  Public
router.post('/callback/:txnId', async (req, res) => {
    // PhonePe sends status in body (base64)
    // We should ideally verify signature here too
    // For simplicity, we just redirect user back to frontend with status
    const txnId = req.params.txnId;

    // In a real scenario, you decode request body and verify checksum
    // const { response } = req.body;
    // ... verification logic ...

    // After callback, we typically verify status via Status API to be sure
    try {
        await checkStatus(txnId);
    } catch (e) {
        console.error("Status check failed on callback", e);
    }

    // Redirect to frontend Status Page
    res.redirect(`http://localhost:5173/payment?txnId=${txnId}`);
});

// Helper to check status
const checkStatus = async (merchantTransactionId) => {
    const stringToSign = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToSign).digest('hex');
    const checksum = sha256 + "###" + SALT_INDEX;

    const options = {
        method: 'get',
        url: `${PHONEPE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': MERCHANT_ID
        }
    };

    const response = await axios(options);

    if (response.data.success && response.data.code === 'PAYMENT_SUCCESS') {
        await Payment.findOneAndUpdate(
            { transactionId: merchantTransactionId },
            { status: 'paid' } // mapped from 'paid' enum
        );
        return true;
    } else {
        await Payment.findOneAndUpdate(
            { transactionId: merchantTransactionId },
            { status: 'failed' }
        );
        return false;
    }
};

// @route   GET api/payments/status/:txnId
// @desc    Check status manually (called by frontend)
// @access  Public
router.get('/status/:txnId', async (req, res) => {
    try {
        const isPaid = await checkStatus(req.params.txnId);
        if (isPaid) {
            res.json({ status: 'paid', msg: 'Payment Successful' });
        } else {
            res.json({ status: 'failed', msg: 'Payment Failed or Pending' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error checking status");
    }
});

module.exports = router;
