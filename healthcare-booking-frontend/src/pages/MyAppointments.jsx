// frontend/src/pages/MyAppointments.jsx
import React, { useState, useEffect } from 'react';
import API from '../services/api';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await API.get('/appointments');
                setAppointments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAppointments();
    }, []);

    const handleCancel = async (id) => {
        try {
            await API.delete(`/appointments/${id}`);
            setAppointments(appointments.map((app) => app._id === id ? { ...app, status: 'cancelled' } : app));
        } catch (err) {
            console.error(err);
            alert('Cancellation failed');
        }
    };

    return (
        <div className="card">
            <h2>My Appointments</h2>
            {appointments.length === 0 ? (
                <p>No appointments booked yet.</p>
            ) : (
                <ul>
                    {appointments.map((app) => (
                        <li key={app._id}>
                            <p><strong>Doctor:</strong> Dr. {app.doctor.name}</p>
                            <p><strong>Date:</strong> {new Date(app.date).toDateString()} at {app.timeSlot}</p>
                            <p><strong>Status:</strong> {app.status}</p>
                            {app.status !== 'cancelled' && (
                                <button className="btn" onClick={() => handleCancel(app._id)}>Cancel</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyAppointments;
