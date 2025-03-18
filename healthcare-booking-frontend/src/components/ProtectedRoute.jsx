// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ allowedRoles, children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    let role = null;
    try {
        const decoded = jwtDecode.default ? jwtDecode.default(token) : jwtDecode(token);
        role = decoded.role;
    } catch (error) {
        console.error('Error decoding token:', error);
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        // Role not allowed
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
