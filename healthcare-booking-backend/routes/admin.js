// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/auth');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Admin views pending doctor registrations (protected)
router.get('/doctors/pending', auth, authorizeRoles('admin'), async (req, res) => {
    try {
        const pendingDoctors = await User.find({ role: 'doctor', approved: false });
        res.json(pendingDoctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Admin approves a doctor registration (protected)
router.post('/doctors/approve/:id', auth, authorizeRoles('admin'), async (req, res) => {
    try {
        let doctor = await User.findById(req.params.id);
        if (!doctor || doctor.role !== 'doctor')
            return res.status(404).json({ message: 'Doctor not found' });
        doctor.approved = true;
        await doctor.save();
        res.json({ message: 'Doctor approved', doctor });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Admin rejects a doctor registration (protected)
router.delete('/doctors/reject/:id', auth, authorizeRoles('admin'), async (req, res) => {
    try {
        let doctor = await User.findById(req.params.id);
        if (!doctor || doctor.role !== 'doctor')
            return res.status(404).json({ message: 'Doctor not found' });
        await doctor.remove();
        res.json({ message: 'Doctor rejected and removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Admin views all appointments (protected)
router.get('/appointments', auth, authorizeRoles('admin'), async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient', 'name email')
            .populate('doctor', 'name specialization');
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Admin manages all users (protected)
router.get('/users', auth, authorizeRoles('admin'), async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
