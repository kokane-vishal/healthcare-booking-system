// frontend/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            background: '#007bff',
            color: '#fff',
            padding: '10px',
            textAlign: 'center',
            marginTop: '20px'
        }}>
            <p>&copy; {new Date().getFullYear()} Healthcare Booking System. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
