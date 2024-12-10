const express = require('express');
const Address = require('../models/Address');
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const newAddress = new Address(req.body);
        await newAddress.save();
        res.json(newAddress);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;