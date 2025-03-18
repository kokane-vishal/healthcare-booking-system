// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// API status(Cannot GET /)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Middleware
app.use(helmet());
app.use(morgan('dev'));
// app.use(morgan('combined'));
app.use(express.json());

// Configure CORS to allow only trusted origins
app.use(cors({
    origin: process.env.CLIENT_URL || '*' // CLIENT_URL
}));

// Rate Limiting: Limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));


// Import routes
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctor');
const appointmentRoutes = require('./routes/appointment');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);

// Serve static assets if in production (frontend build folder)
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../healthcare-booking-frontend/build')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../healthcare-booking-frontend/build', 'index.html'));
//     });
// }

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
