import React from 'react'
import Header from '../utils/Header'
import Footer from '../utils/Footer'
import Sidebar from '../utils/Sidebar'

const Layout = ({ Page }) => {
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
