// backend/models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
    {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true },
        timeSlot: { type: String, required: true },
        status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
