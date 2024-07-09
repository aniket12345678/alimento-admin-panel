import React, { useEffect } from 'react'
import Header from '../utils/Header'
import Footer from '../utils/Footer'
import Sidebar from '../utils/Sidebar'
import { adminAuthCheck } from '../config/AuthCheck'
import { useNavigate } from 'react-router-dom'

const Layout = ({ Page }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!adminAuthCheck.getAuthUser()) {
            navigate('/')
        }
    }, [adminAuthCheck.getAuthUser()])
    return (
        <>
            <Header />
            <Sidebar />
            <main id='main' className='main'>
                <Page />
            </main>
            <Footer />
        </>
    )
}

export default Layout
