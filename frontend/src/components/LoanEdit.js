import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoan } from '../redux/loanSlice'; 
import { fetchBooks } from '../redux/bookSlice';
import { fetchMembers } from '../redux/memberSlice';
import { useParams } from 'react-router-dom';

const LoanEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const loan = useSelector((state) =>
    state.loans.loans.find((loan) => loan._id === id)
  );

  const books = useSelector((state) => state.books.books);
  const members = useSelector((state) => state.members.members);

  const [memberId, setMemberId] = useState('');
  const [bookId, setBookId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returned, setReturned] = useState(false);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
    if (members.length === 0) {
      dispatch(fetchMembers());
    }
  }, [dispatch, books.length, members.length]);

  useEffect(() => {
    if (loan) {
      setMemberId(loan.member_id);
      setBookId(loan.book_id);
      setReturnDate(loan.return_date || '');
      setReturned(loan.returned);
    }
  }, [loan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLoan({ 
      id, 
      loan: { 
        member_id: memberId, 
        book_id: bookId, 
        return_date: returnDate, 
        returned 
      } 
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Loan</h2>
      <label>
        Member:
        <select value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
          <option value="" disabled>Select Member</option>
          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Book:
        <select value={bookId} onChange={(e) => setBookId(e.target.value)} required>
          <option value="" disabled>Select Book</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Return Date:
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Returned:
        <input
          type="checkbox"
          checked={returned}
          onChange={(e) => setReturned(e.target.checked)}
        />
      </label>
      <br />
      <button type="submit">Update Loan</button>
    </form>
  );
};

export default LoanEdit;
