import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../redux/userSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { currentUser, status, error } = useSelector((state) => state.users); // Ensure 'users' matches the key in the store

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Inspect error object
  const errorMessage = error?.message || error;

  return (
    <div>
      <h2>Login</h2>
      {!currentUser ? (
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <p>Welcome, {currentUser.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {status === 'loading' && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>} {/* Render error message safely */}
    </div>
  );
};

export default Login;
