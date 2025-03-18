import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const token = localStorage.getItem('token');
    let role = null;
    let userId = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
            userId = decoded.id;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>

            {/* Show links when no one is logged in */}
            {!token && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}

            {/* Patient navigation */}
            {token && role === 'patient' && (
                <>
                    <Link to="/doctors">Doctors</Link> |{' '}
                    <Link to="/my-appointments">Appointments</Link>
                </>
            )}

            {/* Doctor navigation */}
            {token && role === 'doctor' && (
                <>
                    <Link to="/doctors">Doctors</Link> |{' '}
                    <Link to="/doctor-dashboard">Doctor Dashboard</Link> |{' '}
                    <Link to={`/doctor/${userId}`}>Profile</Link>
                </>
            )}

            {/* Admin navigation */}
            {token && role === 'admin' && (
                <>
                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                </>
            )}

            {token && <button onClick={handleLogout}>Logout</button>}
        </nav>
    );
};

export default Navbar;
