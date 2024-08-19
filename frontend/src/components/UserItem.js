import React from 'react';

const UserItem = ({ user, isEditing, startEdit, saveEdit, cancelEdit, handleDelete, setUsername, setRole }) => (
  <div className="col-md-4 mb-3">
    <div className="p-3" style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', height: '100%' }}>
      {isEditing ? (
        <div>
          <div className="form-group mb-3">
            <label className="form-label" style={{ color: '#495057' }}>Username:</label>
            <input 
              type="text" 
              defaultValue={user.username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="form-control"
              style={{ borderColor: '#ced4da', borderRadius: '5px' }}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" style={{ color: '#495057' }}>Role:</label>
            <select 
              defaultValue={user.role} 
              onChange={(e) => setRole(e.target.value)} 
              className="form-select"
              style={{ borderColor: '#ced4da', borderRadius: '5px' }}
              required
            >
              <option value="admin">Admin</option>
              <option value="librarian">Librarian</option>
            </select>
          </div>
          <button 
            onClick={saveEdit} 
            className="btn btn-primary me-2" 
            style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}
          >
            Save
          </button>
          <button 
            onClick={cancelEdit} 
            className="btn btn-secondary"
            style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button 
            onClick={startEdit} 
            className="btn btn-warning me-2"
            style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
          >
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger"
            style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  </div>
);

export default UserItem;
