import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Axios from 'axios';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import HomePage from './components/HomePage';
import UserForm from './components/UserForm';
import BookForm from './components/BookForm';
import MemberForm from './components/MemberForm';
import LoanForm from './components/LoanForm';
import UserList from './components/UserList';
import BookList from './components/BookList';
import MemberList from './components/MemberList';
import LoanList from './components/LoanList';
import ReturnedLoanList from './components/ReturnedLoanList';
import Login from './components/Login';

function App() {
  const [data, setData] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const { currentUser } = useSelector((state) => state.users);
  console.log(currentUser)

  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/getData");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/add-user">Add User</Link>
                </li>
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
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage data={data} />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/users"
                element={currentUser ? <UserList /> : <Navigate to="/login" />}
              />
              <Route path="/add-user" element={<UserForm />} />
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
      </PersistGate>
    </Provider>
  );
}

export default App;
