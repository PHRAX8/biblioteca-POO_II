import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/bookSlice';
import { fetchMembers } from '../redux/memberSlice';
import { fetchLoans, deleteLoan, updateLoan } from '../redux/loanSlice';
import LoanItem from './LoanItem';

const LoanList = () => {
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

  const handleUpdate = useCallback((id, loanData) => {
    dispatch(updateLoan({ id, loanData }));
  }, [dispatch]);

  const handleReturnedChange = (loan) => {
    const updatedLoan = {
      ...loan,
      returned: !loan.returned,
      return_date: !loan.returned ? new Date().toISOString().split('T')[0] : null,
    };
    handleUpdate(loan._id, updatedLoan);
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#6c757d' }}>Loan List</h2>
      {status === 'loading' ? <p className="text-center">Loading...</p> : null}
      {status === 'failed' ? (
        <p className="text-center" style={{ color: '#dc3545' }}>Error: {typeof error === 'string' ? error : error.message}</p>
      ) : null}
      {status === 'succeeded' ? (
        <div className="row">
          {loans
            .filter((loan) => !loan.returned)
            .map((loan) => (
              <LoanItem
                key={loan._id}
                loan={loan}
                handleReturnedChange={handleReturnedChange}
                handleDelete={handleDelete}
                isAdmin={isAdmin}
              />
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default LoanList;
