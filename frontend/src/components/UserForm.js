import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ username, password, role }));
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Role:
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
