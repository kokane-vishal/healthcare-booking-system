// frontend/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
    const [pendingDoctors, setPendingDoctors] = useState([]);
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorsRes = await API.get('/admin/doctors/pending');
                setPendingDoctors(doctorsRes.data);
                const usersRes = await API.get('/admin/users');
                setUsers(usersRes.data);
                const appointmentsRes = await API.get('/admin/appointments');
                setAppointments(appointmentsRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const approveDoctor = async (id) => {
        try {
            await API.post(`/admin/doctors/approve/${id}`);
            setPendingDoctors(pendingDoctors.filter((doc) => doc._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const rejectDoctor = async (id) => {
        try {
            await API.delete(`/admin/doctors/reject/${id}`);
            setPendingDoctors(pendingDoctors.filter((doc) => doc._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card">
            <h2>Admin Dashboard</h2>

            <h3>Pending Doctor Approvals</h3>
            {pendingDoctors.length === 0 ? (
                <p>No pending approvals.</p>
            ) : (
                <ul>
                    {pendingDoctors.map((doc) => (
                        <li key={doc._id}>
                            <p>{doc.name} - {doc.specialization}</p>
                            <button className="btn" onClick={() => approveDoctor(doc._id)}>Approve</button>
                            <button className="btn" onClick={() => rejectDoctor(doc._id)}>Reject</button>
                        </li>
                    ))}
                </ul>
            )}

            <h3>All Users</h3>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>{user.name} - {user.role}</li>
                    ))}
                </ul>
            )}

            <h3>All Appointments</h3>
            {appointments.length === 0 ? (
                <p>No appointments scheduled.</p>
            ) : (
                <ul>
                    {appointments.map((app) => (
                        <li key={app._id}>
                            <p>Dr. {app.doctor.name} with {app.patient.name} on {new Date(app.date).toDateString()} at {app.timeSlot}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminDashboard;
