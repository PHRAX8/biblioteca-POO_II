import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import Navbar from '../components/Navbar';
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
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    const { currentUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <Router>
            <div className="container-fluid d-flex flex-column min-vh-100" style={{ backgroundColor: '#f7f9fc' }}>
                <Navbar currentUser={currentUser} onLogout={handleLogout} />
                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/admin/users" element={<ProtectedRoute element={<UserManagement />} isAllowed={currentUser?.role === 'admin'} />} />
                        <Route path="/books" element={<ProtectedRoute element={<BookList />} isAllowed={!!currentUser} />} />
                        <Route path="/add-book" element={<ProtectedRoute element={<BookForm />} isAllowed={!!currentUser} />} />
                        <Route path="/members" element={<ProtectedRoute element={<MemberList />} isAllowed={!!currentUser} />} />
                        <Route path="/add-member" element={<ProtectedRoute element={<MemberForm />} isAllowed={!!currentUser} />} />
                        <Route path="/loans" element={<ProtectedRoute element={<LoanList />} isAllowed={!!currentUser} />} />
                        <Route path="/returnedloans" element={<ProtectedRoute element={<ReturnedLoanList />} isAllowed={!!currentUser} />} />
                        <Route path="/add-loan" element={<ProtectedRoute element={<LoanForm />} isAllowed={!!currentUser} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default AppRoutes;
