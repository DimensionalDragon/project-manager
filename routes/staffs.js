const express = require('express');

const protect = require('../middlewares/protect');
const Staff = require('../models/Staff');

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const staffs = await Staff.findAll();
        res.json({ status: 'success', staffs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        res.json({ status: 'success', staff });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            name,
            address,
            phoneNumber,
            whatsappNumber,
            email,
            positionId,
            statusId,
        } = req.body;

        const staff = await Staff.create({
            name,
            address,
            phoneNumber,
            whatsappNumber,
            email,
            StaffPositionId: positionId,
            StaffStatusId: statusId,
        });

        res.json({ status: 'success', staff });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const {
            name,
            address,
            phoneNumber,
            whatsappNumber,
            email,
            positionId,
            statusId,
        } = req.body;

        const [affected, result] = await Staff.update(
            {
                name,
                address,
                phoneNumber,
                whatsappNumber,
                email,
                StaffPositionId: positionId,
                StaffStatusId: statusId,
            },
            { where: { id: req.params.id } }
        );

        res.json({ status: 'success', staff: result[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Staff.destroy({ where: { id: req.params.id } });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

module.exports = router;
