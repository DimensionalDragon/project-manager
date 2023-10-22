const express = require('express');

const protect = require('../middlewares/protect');
const ProjectGroup = require('../models/ProjectGroup');

const parseId = require('../utils/parseId')

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const projectId = parseId(req.query.projectId);
        const projectGroups = await ProjectGroup.findAll({
            where: { ProjectId: projectId },
        });
        res.json({ status: 'success', projectGroups });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const task = await ProjectGroup.findByPk(req.params.id);
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
            projectId
        } = req.body;

        const projectGroup = await ProjectGroup.create({
            name,
            ProjectId: parseId(projectId),
        });

        res.json({ status: 'success', projectGroup });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const {
            name,
            projectId
        } = req.body;

        const [affected, result] = await ProjectGroup.update(
            {
                name,
                ProjectId: projectId,
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
        await ProjectGroup.destroy({ where: { id: req.params.id } });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

module.exports = router;