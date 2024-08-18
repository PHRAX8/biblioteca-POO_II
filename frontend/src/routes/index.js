import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import HomePage from '../components/HomePage';
import Login from '../components/Login';
import Register from '../components/UserForm';
import UserManagement from '../components/UserList';
import BookForm from '../components/BookForm';
import MemberForm from '../components/MemberForm';
import LoanForm from '../components/LoanForm';
import BookList from '../components/BookList';
import MemberList from '../components/MemberList';
import LoanList from '../components/LoanList';
import ReturnedLoanList from '../components/ReturnedLoanList';

const AppRoutes = () => {
    const { currentUser } = useSelector((state) => state.users);
    const isAdmin = currentUser?.role === 'admin';
    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <Router>
            <div>
                <nav>
                    <ul>

                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
                {currentUser && (
                    <ul>
                        <li>
                            <Link to="/books">Books</Link>
                        </li>
                        <li>
                            <Link to="/add-book">Add Book</Link>
                        </li>
                        <li>
                            <Link to="/members">Members</Link>
                        </li>
                        <li>
                            <Link to="/add-member">Add Member</Link>
                        </li>
                        <li>
                            <Link to="/loans">Loans</Link>
                        </li>
                        <li>
                            <Link to="/returnedloans">Returned Loans</Link>
                        </li>
                        <li>
                            <Link to="/add-loan">Add Loan</Link>
                        </li>
                        {isAdmin && (
                            <li>
                                <Link to="/admin/users">Users</Link>
                            </li>
                        )}
                        <div>
                            <p>Welcome, {currentUser.username}!</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </ul>
                )}
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    {/* Authentication-related routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Admin-related routes */}
                    <Route path="/admin/users" element={isAdmin ? <UserManagement /> : <Navigate to="/login" />} />
                    
                    {/* User-related routes */}
                    <Route
                        path="/books"
                        element={currentUser ? <BookList /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/add-book"
                        element={currentUser ? <BookForm /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/members"
                        element={currentUser ? <MemberList /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/add-member"
                        element={currentUser ? <MemberForm /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/loans"
                        element={currentUser ? <LoanList /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/returnedloans"
                        element={currentUser ? <ReturnedLoanList /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/add-loan"
                        element={currentUser ? <LoanForm /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>

        </Router>
    );
};

export default AppRoutes;
