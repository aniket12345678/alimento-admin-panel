import React from 'react'
import { Link } from 'react-router-dom'

const sidebarMenu = [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Users', path: '/users' },
    { title: 'Categories', path: '/categories' },
    { title: 'Items', path: '/items' },
    { title: 'Orders', path: '/orders' }
];

const Sidebar = () => {
    const pathName = window.location.pathname;
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                {
                    sidebarMenu.map((itr,index) => {
                        return (
                            <li className="nav-item" key={itr+index}>
                                <Link
                                    className={`nav-link ${pathName === itr.path ? '' : 'collapsed'}`}
                                    to={itr.path}
                                >
                                    <i className="bi bi-grid" />
                                    <span>{itr.title}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </aside>
    )
}

export default Sidebar
