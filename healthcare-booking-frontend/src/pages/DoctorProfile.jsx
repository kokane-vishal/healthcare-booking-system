// frontend/src/pages/DoctorProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const DoctorProfile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await API.get(`/doctors/${id}`);
                setDoctor(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDoctor();
    }, [id]);

    if (!doctor) return <div className="card">Loading...</div>;

    return (
        <div className="card">
            <h2>Dr. {doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <h3>Availability</h3>
            <ul>
                {doctor.availability &&
                    doctor.availability.map((slot, index) => (
                        <li key={index}>
                            {new Date(slot.date).toDateString()} : {slot.timeSlots.join(', ')}
                        </li>
                    ))}
            </ul>
            <button className="btn" onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
                Book Appointment
            </button>
        </div>
    );
};

export default DoctorProfile;
