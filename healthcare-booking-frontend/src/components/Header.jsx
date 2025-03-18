// frontend/src/components/Header.jsx
import React from 'react';

const Header = () => {
    const headerStyle = {
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    };

    return (
        <header style={headerStyle}>
            <h1 style={{ fontSize: '3rem' }}>Healthcare Booking</h1>
            <p style={{ fontSize: '1.2rem' }}>Your Health, Our Priority</p>
        </header>
    );
};

export default Header;
