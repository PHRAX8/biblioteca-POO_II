import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/bookSlice';
import { fetchMembers } from '../redux/memberSlice';
import { fetchLoans, deleteLoan } from '../redux/loanSlice';
import LoanCard from './LoanCard';

const ReturnedLoanList = () => {
  const loans = useSelector((state) => state.loans.loans);
  const status = useSelector((state) => state.loans.status);
  const error = useSelector((state) => state.loans.error);

  const { currentUser } = useSelector((state) => state.users);
  const isAdmin = currentUser?.role === 'admin';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchMembers());
    dispatch(fetchLoans());
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteLoan(id));
  }, [dispatch]);

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#6c757d' }}>Returned Loan List</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && (
        <p>Error: {typeof error === 'string' ? error : error.message}</p>
      )}
      {status === 'succeeded' && (
        <div className="row">
          {loans
            .filter((loan) => loan.returned === true)
            .map((loan) => (
              <div key={loan._id} className="col-md-4 mb-3">
                <LoanCard loan={loan} onDelete={handleDelete} isAdmin={isAdmin} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ReturnedLoanList;
