// backend/routes/doctor.js
const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/auth');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Get list of doctors (optionally filtered by specialization)
router.get('/', async (req, res) => {
    const { specialization } = req.query;
    try {
        const query = { role: 'doctor', approved: true };
        if (specialization) query.specialization = specialization;
        const doctors = await User.find(query);
        res.json(doctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Doctor views their booked appointments (protected)
// This route is now defined before the parameterized route below.
router.get('/appointments', auth, authorizeRoles('doctor'), async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctor: req.user.id })
            .populate('patient', 'name email');
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Doctor sets availability (protected)
router.post('/availability', auth, authorizeRoles('doctor'), async (req, res) => {
    const { date, timeSlots } = req.body;
    try {
        let doctor = await User.findById(req.user.id);
        if (!doctor)
            return res.status(404).json({ message: 'Doctor not found' });
        // Add or update availability for the given date
        const existing = doctor.availability.find(
            (av) => new Date(av.date).toDateString() === new Date(date).toDateString()
        );
        if (existing) {
            existing.timeSlots = timeSlots;
        } else {
            doctor.availability.push({ date, timeSlots });
        }
        await doctor.save();
        res.json({ message: 'Availability updated', availability: doctor.availability });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a doctor’s profile & availability (parameterized route)
// This must come after all fixed routes.
router.get('/:id', async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id);
        if (!doctor || doctor.role !== 'doctor')
            return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
