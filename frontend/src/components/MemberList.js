import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, deleteMember, updateMember } from '../redux/memberSlice';
import MemberCard from './MemberCard';

const MemberList = () => {
  const members = useSelector((state) => state.members.members);
  const status = useSelector((state) => state.members.status);
  const error = useSelector((state) => state.members.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteMember(id));
  }, [dispatch]);

  const handleUpdate = useCallback((id, memberData) => {
    dispatch(updateMember({ id, memberData }));
  }, [dispatch]);

  const [editingMember, setEditingMember] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', phone: '' });

  const startEdit = (member) => {
    setEditingMember(member);
    setEditData({ name: member.name, email: member.email, phone: member.phone });
  };

  const handleEditChange = (field, value) => {
    setEditData(prevData => ({ ...prevData, [field]: value }));
  };

  const saveEdit = () => {
    if (editingMember) {
      handleUpdate(editingMember._id, editData);
      setEditingMember(null);
      setEditData({ name: '', email: '', phone: '' });
    }
  };

  const cancelEdit = () => {
    setEditingMember(null);
    setEditData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#6c757d' }}>Member List</h2>
      {status === 'loading' ? <p>Loading...</p> : null}
      {status === 'failed' ? <p>Error: {typeof error === 'string' ? error : error.message}</p> : null}
      {status === 'succeeded' ? (
        <div className="row">
          {members.map((member) => (
            <div key={member._id} className="col-md-4 mb-3">
              <MemberCard
                member={member}
                onEdit={(action, data) => {
                  if (action === 'start') {
                    startEdit(data);
                  } else if (action === 'save') {
                    saveEdit();
                  } else if (action === 'cancel') {
                    cancelEdit();
                  }
                }}
                onDelete={handleDelete}
                isEditing={editingMember && editingMember._id === member._id}
                editData={editData}
                handleEditChange={handleEditChange}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MemberList;
