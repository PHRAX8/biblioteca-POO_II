import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './components/HomePage';
import UserForm from './components/UserForm';
import BookForm from './components/BookForm';
import MemberForm from './components/MemberForm';
import UserList from './components/UserList';
import BookList from './components/BookList';
import MemberList from './components/MemberList';

function App() {
  const [data, setData] = useState("");

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

  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
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
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/add-book" element={<BookForm />} />            
            <Route path="/members" element={<MemberList />} />
            <Route path="/add-member" element={<MemberForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
