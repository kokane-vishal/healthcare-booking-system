// frontend/src/pages/DoctorList.jsx
import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialization, setSpecialization] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await API.get(`/doctors?specialization=${specialization}`);
                setDoctors(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDoctors();
    }, [specialization]);

    return (
        <div>
            <h2>Doctors</h2>
            <input
                type="text"
                placeholder="Filter by specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
            />
            <div>
                {doctors.map((doc) => (
                    <div className="card" key={doc._id}>
                        <h3>{doc.name}</h3>
                        <p>Specialization: {doc.specialization}</p>
                        <Link to={`/doctor/${doc._id}`} className="btn">
                            View Profile
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorList;
