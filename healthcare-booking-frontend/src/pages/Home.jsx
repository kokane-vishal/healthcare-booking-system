// frontend/src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';

const Home = () => {
    return (
        <>
            <Header />
            <div className="card">
                <h2>Welcome to Healthcare Booking System</h2>
                <p>
                    We offer seamless appointment booking with top-rated doctors. Your health is our priority.
                </p>
            </div>
        </>
    );
};

export default Home;
