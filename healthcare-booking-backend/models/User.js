// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
        specialization: { type: String }, // for doctors
        availability: [
            {
                date: Date,
                timeSlots: [String] // e.g., "09:00", "10:00", etc.
            }
        ],
        approved: { type: Boolean, default: false } // for doctors awaiting admin approval
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
