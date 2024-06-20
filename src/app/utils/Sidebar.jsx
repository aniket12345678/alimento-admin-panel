import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link className="nav-link " to="/dashboard">
                        <i className="bi bi-grid" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/users">
                        <i className="bi bi-grid" />
                        <span>Users</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/categories">
                        <i className="bi bi-menu-button-wide" />
                        <span>Categories</span>
                        <i className="bi bi-chevron-down ms-auto" />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/items">
                        <i className="bi bi-journal-text" />
                        <span>Items</span>
                        <i className="bi bi-chevron-down ms-auto" />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/orders">
                        <i className="bi bi-layout-text-window-reverse" />
                        <span>Orders</span>
                        <i className="bi bi-chevron-down ms-auto" />
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar
