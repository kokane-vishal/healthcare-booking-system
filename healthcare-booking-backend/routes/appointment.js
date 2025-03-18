// backend/routes/appointment.js
const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Patient books an appointment (protected)
router.post('/', auth, authorizeRoles('patient'), async (req, res) => {
    const { doctorId, date, timeSlot } = req.body;
    try {
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'doctor')
            return res.status(404).json({ message: 'Doctor not found' });
        const appointment = new Appointment({
            patient: req.user.id,
            doctor: doctorId,
            date,
            timeSlot,
            status: 'pending'
        });
        await appointment.save();
        res.json({ message: 'Appointment booked', appointment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Patient views their appointments (protected)
router.get('/', auth, authorizeRoles('patient'), async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user.id })
            .populate('doctor', 'name specialization');
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Patient cancels an appointment (protected)
router.delete('/:id', auth, authorizeRoles('patient'), async (req, res) => {
    try {
        let appointment = await Appointment.findById(req.params.id);
        if (!appointment)
            return res.status(404).json({ message: 'Appointment not found' });
        if (appointment.patient.toString() !== req.user.id)
            return res.status(403).json({ message: 'Unauthorized' });
        appointment.status = 'cancelled';
        await appointment.save();
        res.json({ message: 'Appointment cancelled', appointment });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
