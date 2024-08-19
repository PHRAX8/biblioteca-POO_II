import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userSlice';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { currentUser } = useSelector((state) => state.users);
  const isAdmin = currentUser?.role === 'admin';

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ username, password, role }));
  };

  const roleOptions = [
    { id: 'librarian', label: 'Librarian' },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin' }] : []),
  ];

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
      <h1 className="text-center" style={{ color: '#6c757d' }}>Add User</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <FormInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <FormSelect
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={roleOptions}
          required
        />
        <button 
          type="submit" 
          className="btn btn-primary w-100 mt-3" 
          style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
