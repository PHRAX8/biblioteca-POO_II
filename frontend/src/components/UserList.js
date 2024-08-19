import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../redux/userSlice';
import UserItem from './UserItem';

const UserList = () => {
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteUser(id));
  }, [dispatch]);

  const handleUpdate = useCallback((id, userData) => {
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
    if (editingUser) {
      handleUpdate(editingUser._id, { username, role });
      setEditingUser(null);
      setUsername('');
      setRole('');
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setUsername('');
    setRole('');
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#6c757d' }}>User List</h2>
      {status === 'loading' ? <p className="text-center">Loading...</p> : null}
      {status === 'failed' ? (
        <p className="text-center" style={{ color: '#dc3545' }}>Error: {typeof error === 'string' ? error : error.message}</p>
      ) : null}
      {status === 'succeeded' && (
        <div className="row">
          {users && users.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              isEditing={editingUser && editingUser._id === user._id}
              startEdit={() => startEdit(user)}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              handleDelete={() => handleDelete(user._id)}
              setUsername={setUsername}
              setRole={setRole}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
