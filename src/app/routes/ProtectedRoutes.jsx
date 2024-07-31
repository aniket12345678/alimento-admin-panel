import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage'

const ProtectedRoutes = () => {
    const isLoggedIn = secureLocalStorage.getItem('loginStatus') &&
        JSON.parse(secureLocalStorage.getItem('loginStatus')).isloggedIn;
    return (
        <div>
            {
                isLoggedIn ? <Outlet /> : <Navigate to='/' />
            }
        </div>
    )
}

export default ProtectedRoutes
