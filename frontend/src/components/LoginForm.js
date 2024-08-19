import React from 'react';

const LoginForm = ({ username, password, onUsernameChange, onPasswordChange, onSubmit, isLoading, errorMessage }) => (
  <form onSubmit={onSubmit} className="w-50">
    <div className="form-group mb-3">
      <label className="form-label" style={{ color: '#495057' }}>Username:</label>
      <input
        type="text"
        value={username}
        onChange={onUsernameChange}
        required
        className="form-control"
        style={{ borderColor: '#ced4da', borderRadius: '5px' }}
      />
    </div>
    <div className="form-group mb-3">
      <label className="form-label" style={{ color: '#495057' }}>Password:</label>
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        required
        className="form-control"
        style={{ borderColor: '#ced4da', borderRadius: '5px' }}
      />
    </div>
    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}>Login</button>
    {isLoading && <p className="text-center mt-3">Loading...</p>}
    {errorMessage && <p className="text-center mt-3" style={{ color: 'red' }}>{errorMessage}</p>}
  </form>
);

export default LoginForm;
