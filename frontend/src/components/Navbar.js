import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, onLogout }) => (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#6c757d' }}>
        <Link className="navbar-brand" to="/" style={{ color: '#ffffff' }}>LibraryHub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/">
                        <i className="fas fa-home"></i> Home
                    </Link>
                </li>
                {!currentUser && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/login">
                                <i className="fas fa-sign-in-alt"></i> Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/register">
                                <i className="fas fa-user-plus"></i> Register
                            </Link>
                        </li>
                    </>
                )}
                {currentUser && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/books">
                                <i className="fas fa-book"></i> Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/add-book">
                                <i className="fas fa-plus-circle"></i> Add Book
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/members">
                                <i className="fas fa-users"></i> Members
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/add-member">
                                <i className="fas fa-user-plus"></i> Add Member
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/loans">
                                <i className="fas fa-book-reader"></i> Loans
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/returnedloans">
                                <i className="fas fa-undo"></i> Returned Loans
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/add-loan">
                                <i className="fas fa-plus-circle"></i> Add Loan
                            </Link>
                        </li>
                        {currentUser.role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/admin/users">
                                    <i className="fas fa-user-cog"></i> Users
                                </Link>
                            </li>
                        )}
                    </>
                )}
            </ul>
            {currentUser && (
                <div className="d-flex align-items-center">
                    <span className="text-light me-3">Welcome, {currentUser.username}!</span>
                    <button className="btn btn-outline-light" onClick={onLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            )}
        </div>
    </nav>
);

export default Navbar;
