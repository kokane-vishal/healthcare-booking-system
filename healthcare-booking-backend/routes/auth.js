// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// Register route with input validation
router.post(
    '/register',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password, role, specialization } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user)
                return res.status(400).json({ message: 'User already exists' });

            user = new User({
                name,
                email,
                password,
                role: role || 'patient',
                specialization: role === 'doctor' ? specialization : undefined,
                approved: role === 'doctor' ? false : true
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = { id: user._id, role: user.role };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1d' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Login route with input validation
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user)
                return res.status(400).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ message: 'Invalid credentials' });

            const payload = { id: user._id, role: user.role };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1d' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
