import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../redux/userSlice';

const UserList = () => {
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Dispatching fetchUsers');
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    console.log(`Deleting user with id: ${id}`);
    dispatch(deleteUser(id));
  }, [dispatch]);

  const handleUpdate = useCallback((id, userData) => {
    console.log(`Updating user with id: ${id}`);
    dispatch(updateUser({ id, userData }));
  }, [dispatch]);

  const [editingUser, setEditingUser] = useState(null);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const startEdit = (user) => {
    setEditingUser(user);
    setUsername(user.username);
    setRole(user.role);
  };

  const saveEdit = () => {
    handleUpdate(editingUser._id, { username, role });
    setEditingUser(null);
    setUsername('');
    setRole('');
  };

  return (
    <div>
      <h2>User List</h2>
      {status === 'loading' ? <p>Loading...</p> : null}
      {status === 'failed' ? <p>Error: {error}</p> : null}
      {status === 'succeeded' ? (
        <ul>
          {users && users.map((user) => (
            <li key={user._id}>
              {editingUser && editingUser._id === user._id ? (
                <div>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="librarian">Librarian</option>
                  </select>
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {user.username} - {user.role}
                  <button onClick={() => startEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ): null}
    </div>
  );
};

export default UserList;
