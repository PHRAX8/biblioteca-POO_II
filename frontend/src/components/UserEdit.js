import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import { useParams } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === id)
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPassword(user.password);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, user: { username, password, role } }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
        required
      />
      <button type="submit">Update User</button>
    </form>
  );
};

export default UserEdit;
