const express = require('express');

const protect = require('../middlewares/protect');
const parseId = require('../utils/parseId');
const Project = require('../models/Project');
const ProjectGroup = require('../models/ProjectGroup');
const Task = require('../models/Task');
const Staff = require('../models/Staff');
const TaskStatus = require('../models/TaskStatus');

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const customerId = parseId(req.query.customerId);
        const projects = await Project.findAll({
            where: { CustomerId: customerId },
        });
        res.json({ status: 'success', projects });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customerId = parseId(req.query.customerId || '');
        const projectId = parseId(req.params.id);
        const project = await Project.findByPk(projectId, {
            include: {
                model: ProjectGroup,
                include: {
                    model: Task,
                    include: [Staff, TaskStatus]
                }
            }});
        if (project.CustomerId !== customerId)
            return res
                .status(403)
                .json({ status: 'error', message: 'Unauthorized' });
        res.json({ status: 'success', project });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, customerId } = req.body;

        const project = await Project.create({
            name,
            CustomerId: parseId(customerId),
        });

        res.json({ status: 'success', project });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { name, customerId } = req.body;

        const projectId = parseId(req.params.id);

        const [affected, result] = await Project.update(
            {
                name,
                CustomerId: parseId(customerId),
            },
            { where: { id: projectId } }
        );

        res.json({ status: 'success', project: result[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const projectId = parseId(req.params.id);
        await Project.destroy({ where: { id: projectId } });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

module.exports = router;
