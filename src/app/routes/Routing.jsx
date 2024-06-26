import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from '../pages/auth/Signin';
import Signup from '../pages/auth/Signup';
import '../media/style/style.css';
import '../media/style/css/bootstrap.min.css'
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import Items from '../pages/Items';
import Categories from '../pages/Categories';
import Users from '../pages/Users';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signin />} />
                
                <Route path='/signup' element={<Signup />} />

                <Route path='/dashboard' element={<Layout Page={Dashboard} />} />
                
                <Route path='/users' element={<Layout Page={Users} />} />
                
                <Route path='/categories' element={<Layout Page={Categories} />} />

                <Route path='/items' element={<Layout Page={Items} />} />

                <Route path='/orders' element={<Layout Page={Orders} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing
