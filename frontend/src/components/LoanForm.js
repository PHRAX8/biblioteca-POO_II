import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLoan, fetchLoans } from '../redux/loanSlice';
import { fetchBooks } from '../redux/bookSlice';
import { fetchMembers } from '../redux/memberSlice';

const LoanForm = () => {
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returned, setReturned] = useState(false);
  const [availableBooks, setAvailableBooks] = useState([]);

  const books = useSelector((state) => state.books.books);
  const members = useSelector((state) => state.members.members);
  const loans = useSelector((state) => state.loans.loans);

  const dispatch = useDispatch();

  useEffect(() => {
    if (books.length === 0) {
      console.log('Dispatching fetchBooks');
      dispatch(fetchBooks());
    }

    if (members.length === 0) {
      console.log('Dispatching fetchMembers');
      dispatch(fetchMembers());
    }

    if (loans.length === 0) {
      console.log('Dispatching fetchLoans');
      dispatch(fetchLoans());
    }
  }, [dispatch, books.length, members.length, loans.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!bookId || !memberId || !returnDate) {
      alert('Please fill in all required fields.');
      return;
    }

    dispatch(addLoan({
      book_id: bookId,
      member_id: memberId,
      return_date: returnDate,
      returned
    }));

    // Resetting the form after submission
    setBookId('');
    setMemberId('');
    setReturnDate('');
    setReturned(false);
  };

  return (
    <div>
      <h1>Register Loan</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Book:
          <select value={bookId} onChange={(e) => setBookId(e.target.value)} required>
            <option value="" disabled>Select a book</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title} (ISBN: {book.isbn})
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Member:
          <select value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
            <option value="" disabled>Select a member</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
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
            required
          />
        </label>
        <br />
        <button type="submit">Register Loan</button>
      </form>
    </div>
  );
};

export default LoanForm;
