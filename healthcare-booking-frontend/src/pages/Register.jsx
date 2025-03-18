// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient',
        specialization: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
            // alert('Registration Success')
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <div className="card">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <select name="role" onChange={handleChange}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                {formData.role === 'doctor' && (
                    <input
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        onChange={handleChange}
                        required
                    />
                )}
                <button type="submit" className="btn">Register</button>
            </form>
        </div>
    );
};

export default Register;
