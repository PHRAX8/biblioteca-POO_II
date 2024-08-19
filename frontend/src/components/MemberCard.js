import React from 'react';

const MemberCard = ({ member, onEdit, onDelete, isEditing, editData, handleEditChange }) => (
  <div className="p-3" style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', height: '100%' }}>
    {isEditing ? (
      <div>
        <div className="form-group mb-3">
          <label className="form-label" style={{ color: '#495057' }}>Name:</label>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => handleEditChange('name', e.target.value)}
            className="form-control"
            style={{ borderColor: '#ced4da', borderRadius: '5px' }}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" style={{ color: '#495057' }}>Email:</label>
          <input
            type="email"
            value={editData.email}
            onChange={(e) => handleEditChange('email', e.target.value)}
            className="form-control"
            style={{ borderColor: '#ced4da', borderRadius: '5px' }}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" style={{ color: '#495057' }}>Phone:</label>
          <input
            type="text"
            value={editData.phone}
            onChange={(e) => handleEditChange('phone', e.target.value)}
            className="form-control"
            style={{ borderColor: '#ced4da', borderRadius: '5px' }}
          />
        </div>
        <button onClick={() => onEdit('save')} className="btn btn-primary" style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}>Save</button>
        <button onClick={() => onEdit('cancel')} className="btn btn-secondary ms-2">Cancel</button>
      </div>
    ) : (
      <div>
        <p><strong>Name:</strong> {member.name}</p>
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Phone:</strong> {member.phone}</p>
        <button onClick={() => onEdit('start', member)} className="btn btn-warning me-2">Edit</button>
        <button onClick={() => onDelete(member._id)} className="btn btn-danger">Delete</button>
      </div>
    )}
  </div>
);

export default MemberCard;
