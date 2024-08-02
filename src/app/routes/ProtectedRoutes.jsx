import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { signin } = useSelector((x) => x.authSlice);
    const { isloggedIn } = signin;
    return (
        <div>
            {
                isloggedIn ? <Outlet /> : <Navigate to='/' />
            }
        </div>
    )
}

export default ProtectedRoutes
