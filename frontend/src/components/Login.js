import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import LoginForm from './LoginForm';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const errorMessage = error?.message || error;

  return (
    <div className="container d-flex flex-column align-items-center mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#6c757d' }}>Login</h2>
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleSubmit}
        isLoading={status === 'loading'}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Login;
