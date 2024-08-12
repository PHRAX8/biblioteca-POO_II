import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, deleteMember, updateMember } from '../redux/memberSlice';

const MemberList = () => {
  const members = useSelector((state) => state.members.members);
  const status = useSelector((state) => state.members.status);
  const error = useSelector((state) => state.members.error);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Dispatching fetchMembers');
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    console.log(`Deleting member with id: ${id}`);
    dispatch(deleteMember(id));
  }, [dispatch]);

  const handleUpdate = useCallback((id, memberData) => {
    console.log(`Updating member with id: ${id}`);
    dispatch(updateMember({ id, memberData }));
  }, [dispatch]);

  const [editingMember, setEditingMember] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const startEdit = (member) => {
    setEditingMember(member);
    setName(member.name);
    setEmail(member.email);
    setPhone(member.phone);
  };

  const saveEdit = () => {
    handleUpdate(editingMember._id, { name, email, phone });
    setEditingMember(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div>
      <h2>Member List</h2>
      {status === 'loading' ? <p>Loading...</p> : null}
      {status === 'failed' ? <p>Error: {error}</p> : null}
      {status === 'succeeded' ? (
        <ul>
          {members && members.map((member) => (
            <li key={member._id}>
              {editingMember && editingMember._id === member._id ? (
                <div>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditingMember(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {member.name} - {member.email} - {member.phone}
                  <button onClick={() => startEdit(member)}>Edit</button>
                  <button onClick={() => handleDelete(member._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ): null}
    </div>
  );
};

export default MemberList;
