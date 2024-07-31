import React from 'react'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

import '../media/style/style.css';
import '../media/style/css/bootstrap.min.css'
import { routes } from './routes';

const router = createBrowserRouter(routes);

const Routing = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Routing
