import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/bookSlice';
import { fetchMembers } from '../redux/memberSlice';
import { fetchLoans, deleteLoan, updateLoan } from '../redux/loanSlice';

const ReturnedLoanList = () => {
  const loans = useSelector((state) => state.loans.loans);
  const books = useSelector((state) => state.books.books);
  const members = useSelector((state) => state.members.members);
  const status = useSelector((state) => state.loans.status);
  const error = useSelector((state) => state.loans.error);

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
      return_date: !loan.returned ? new Date().toISOString().split('T')[0] : null, // Generate return date if checkbox is marked
    };
    handleUpdate(loan._id, updatedLoan);
  };

  return (
    <div>
      <h2>Loan List</h2>
      {status === 'loading' ? <p>Loading...</p> : null}
      {status === 'failed' ? (
        <p>Error: {typeof error === 'string' ? error : error.message}</p>
      ) : null}
      {status === 'succeeded' ? (
        <ul>
          {loans
            .filter((loan) => loan.returned === true) // Toggle between showing returned and not returned loans
            .map((loan) => (
              <div key={loan._id}>
                <p>Book: {loan.book_id ? loan.book_id.title : 'Book not available'}</p>
                <p>Member: {loan.member_id ? loan.member_id.name : 'Member not available'}</p>
                <p>Loan Date: {loan.loan_date}</p>
                <p>Return Date: {loan.return_date}</p>
                <button onClick={() => handleDelete(loan._id)}>Delete</button>
              </div>
            ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ReturnedLoanList;
