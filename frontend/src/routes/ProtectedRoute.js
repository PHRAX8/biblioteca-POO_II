import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAllowed }) => (
    isAllowed ? element : <Navigate to="/login" />
);

export default ProtectedRoute;
