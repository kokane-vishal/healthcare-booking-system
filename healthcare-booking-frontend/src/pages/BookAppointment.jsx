// frontend/src/pages/BookAppointment.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const BookAppointment = () => {
    const { id } = useParams(); // doctor id
    const [doctor, setDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
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

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        if (doctor && doctor.availability) {
            const slot = doctor.availability.find(
                (av) => new Date(av.date).toISOString().split('T')[0] === e.target.value
            );
            setTimeSlots(slot ? slot.timeSlots : []);
        }
    };

    const handleBooking = async () => {
        try {
            await API.post('/appointments', {
                doctorId: id,
                date: selectedDate,
                timeSlot: selectedTime
            });
            alert('Appointment booked!');
            navigate('/my-appointments');
        } catch (err) {
            console.error(err);
            alert('Booking failed');
        }
    };

    if (!doctor) return <div className="card">Loading...</div>;

    return (
        <div className="card">
            <h2>Book Appointment with Dr. {doctor.name}</h2>
            <label htmlFor="date">Select Date:</label>
            <input type="date" value={selectedDate} onChange={handleDateChange} />
            {timeSlots.length > 0 ? (
                <>
                    <label htmlFor="timeSlot">Select Time Slot:</label>
                    <select onChange={(e) => setSelectedTime(e.target.value)}>
                        <option value="">Select Time Slot</option>
                        {timeSlots.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </>
            ) : (
                <p>No available slots for this date.</p>
            )}
            <button className="btn" onClick={handleBooking}>Book Appointment</button>
        </div>
    );
};

export default BookAppointment;
