import Items from "../pages/Items";
import Users from "../pages/Users";
import Orders from "../pages/Orders";
import Layout from "../components/Layout";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import ProtectedRoutes from "./ProtectedRoutes";

const authRoutes = [
    {
        path: '/',
        element: <Signin />
    },
    {
        path: '/signup',
        element: <Signup />
    }
];

const guardedRoutes = [
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/dashboard',
                element: <Layout Page={Dashboard} />
            },
            {
                path: '/users',
                element: <Layout Page={Users} />
            },
            {
                path: '/categories',
                element: <Layout Page={Categories} />
            },
            {
                path: '/items',
                element: <Layout Page={Items} />
            },
            {
                path: '/orders',
                element: <Layout Page={Orders} />
            },
        ]
    }
];

export const routes = [...authRoutes, ...guardedRoutes];