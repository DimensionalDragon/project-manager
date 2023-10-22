const express = require('express');

const protect = require('../middlewares/protect');
const parseId = require('../utils/parseId');
const Customer = require('../models/Customer');

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json({ status: 'success', customers });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customerId = parseId(req.params.id);
        const customer = await Customer.findByPk(customerId);
        res.json({ status: 'success', customer });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            name,
            identityNumber,
            address,
            city,
            province,
            country,
            phoneNumber,
            email,
            note,
        } = req.body;

        const customer = await Customer.create({
            name,
            identityNumber,
            address,
            city,
            province,
            country,
            phoneNumber,
            email,
            note,
        });

        res.json({ status: 'success', customer });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const customerId = parseId(req.params.id);
        const {
            name,
            identityNumber,
            address,
            city,
            province,
            country,
            phoneNumber,
            email,
            note,
        } = req.body;

        const [affected, result] = await Customer.update(
            {
                name,
                identityNumber,
                address,
                city,
                province,
                country,
                phoneNumber,
                email,
                note,
            },
            { where: { id: customerId } }
        );

        res.json({ status: 'success', customer: result[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customerId = parseId(req.params.id);
        await Customer.destroy({ where: { id: customerId } });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

module.exports = router;
