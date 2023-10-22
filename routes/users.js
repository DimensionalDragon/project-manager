const express = require('express');
const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const protect = require('../middlewares/protect');

const { JWT_ACCESS_SECRET } = process.env;

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password, repeatPassword } = req.body;
        const id = randomUUID();
        const user = await User.findOne({where: {username}});
        if(user) return res.status(400).json({ status: 'error', message: 'Username is taken' });
        if(password !== repeatPassword) return res.status(400).json({ status: 'error', message: 'Password and Repeated Password should be the same' });
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ id, username, password: hashedPassword });
        res.status(201).json({
            status: 'success',
            message: 'Successfully created user',
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Username or Password is Incorrect',
            });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Username or Password is Incorrect',
            });
        }

        // Generate JWT
        const accessToken = jwt.sign({ username }, JWT_ACCESS_SECRET, {
            expiresIn: '24h',
        });
        return res.json({ status: 'success', accessToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
});

router.get('/me', protect, async (req, res) => {
    res.json({ status: 'success', user: req.user });
});

module.exports = router;
