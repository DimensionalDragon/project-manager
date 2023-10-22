const express = require('express');

const protect = require('../middlewares/protect');
const Task = require('../models/Task');

const parseId = require('../utils/parseId');

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const projectGroupId = parseId(req.query.projectGroupId);
        const tasks = await Task.findAll({
            where: { ProjectGroupId: projectGroupId },
        });
        res.json({ status: 'success', tasks });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        res.json({ status: 'success', task });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            name,
            note,
            startPlan,
            endPlan,
            startActual,
            endActual,
            projectGroupId,
            statusId,
            staffId,
        } = req.body;

        const task = await Task.create({
            name,
            note,
            startPlan,
            endPlan,
            startActual,
            endActual,
            ProjectGroupId: parseId(projectGroupId),
            TaskStatusId: statusId,
            StaffId: parseId(staffId),
        });

        res.json({ status: 'success', task });
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

        const [affected, result] = await Task.update(
            {
                name,
                address,
                phoneNumber,
                whatsappNumber,
                email,
                TaskPositionId: positionId,
                TaskStatusId: statusId,
            },
            { where: { id: req.params.id } }
        );

        res.json({ status: 'success', task: result[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Task.destroy({ where: { id: req.params.id } });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

module.exports = router;