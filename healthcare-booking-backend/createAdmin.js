// backend/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare_booking';

mongoose
    .connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        // Define admin details
        const adminEmail = 'admin@aa.cc';
        const adminPassword = '123456';
        const adminName = 'Admin';

        // Check if admin already exists
        let admin = await User.findOne({ email: adminEmail });
        if (admin) {
            console.log('Admin account already exists.');
        } else {
            // Generate a hashed password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            // Create a new admin account
            admin = new User({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                approved: true // Directly approved for admin
            });

            await admin.save();
            console.log('Admin account created successfully.');
        }

        process.exit();
    })
    .catch((err) => {
        console.error('Error creating admin account:', err);
        process.exit(1);
    });
