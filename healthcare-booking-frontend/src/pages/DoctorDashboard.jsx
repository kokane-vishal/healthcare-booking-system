// frontend/src/pages/DoctorDashboard.jsx
import React, { useState, useEffect } from 'react';
import API from '../services/api';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [availabilityDate, setAvailabilityDate] = useState('');
    const [timeSlots, setTimeSlots] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await API.get('/doctors/appointments');
                setAppointments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAppointments();
    }, []);

    const handleAvailability = async () => {
        try {
            await API.post('/doctors/availability', {
                date: availabilityDate,
                timeSlots: timeSlots.split(',')
            });
            alert('Availability updated');
        } catch (err) {
            console.error(err);
            alert('Failed to update availability');
        }
    };

    return (
        <div className="card">
            <h2>Doctor Dashboard</h2>
            <h3>Set Availability</h3>
            <input
                type="date"
                value={availabilityDate}
                onChange={(e) => setAvailabilityDate(e.target.value)}
            />
            <input
                type="text"
                placeholder="Time slots (comma separated)"
                value={timeSlots}
                onChange={(e) => setTimeSlots(e.target.value)}
            />
            <button className="btn" onClick={handleAvailability}>Update Availability</button>

            <h3>My Appointments</h3>
            {appointments.length === 0 ? (
                <p>No appointments yet.</p>
            ) : (
                <ul>
                    {appointments.map((app) => (
                        <li key={app._id}>
                            <p>{new Date(app.date).toDateString()} at {app.timeSlot} with {app.patient.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DoctorDashboard;
