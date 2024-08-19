import React from 'react';

const LoanItem = ({ loan, handleReturnedChange, handleDelete, isAdmin }) => (
  <div key={loan._id} className="col-md-4 mb-3">
    <div className="p-3" style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', height: '100%' }}>
      <p><strong>Book:</strong> {loan.book_id ? loan.book_id.title : 'Book not available'}</p>
      <p><strong>Member:</strong> {loan.member_id ? loan.member_id.name : 'Member not available'}</p>
      <p><strong>Loan Date:</strong> {loan.loan_date}</p>
      <p><strong>Expected Return Date:</strong> {loan.return_date}</p>
      <p>
        <strong>Returned:</strong>
        <input
          type="checkbox"
          checked={loan.returned}
          onChange={() => handleReturnedChange(loan)}
          style={{ marginLeft: '10px' }}
        />
      </p>
      {isAdmin && (
        <button 
          onClick={() => handleDelete(loan._id)} 
          className="btn btn-danger w-100"
          style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
        >
          Delete
        </button>
      )}
    </div>
  </div>
);

export default LoanItem;
