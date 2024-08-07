import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/auth.slice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link to="/dashboard" className="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">NiceAdmin</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn" />
            </div>
            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item d-block d-lg-none">
                        <a className="nav-link nav-icon search-bar-toggle " href="#">
                            <i className="bi bi-search" />
                        </a>
                    </li>
                    <li className="nav-item dropdown pe-3">
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>Kevin Anderson</h6>
                                <span>Web Designer</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                    <i className="bi bi-person" />
                                    <span>My Profile</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                    <i className="bi bi-gear" />
                                    <span>Account Settings</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                    <i className="bi bi-question-circle" />
                                    <span>Need Help?</span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <i className="bi bi-box-arrow-right" />
                                    <span>Sign Out</span>
                                </a>
                            </li>
                        </ul>{/* End Profile Dropdown Items */}
                    </li>{/* End Profile Nav */}
                </ul>
            </nav>{/* End Icons Navigation */}
            <Button onClick={handleLogout}>logout</Button>
        </header>
    )
}

export default Header
