import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserForm from './components/UserForm';
import HomePage from './components/HomePage';
import UserList from './components/UserList';

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
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/add-user" element={<UserForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
