import React from 'react'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  )
}

export default PublicRoute
