import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLoan, fetchLoans } from '../redux/loanSlice';
import { fetchBooks } from '../redux/bookSlice';
import { fetchMembers } from '../redux/memberSlice';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';

const LoanForm = () => {
  const [bookId, setBookId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returned, setReturned] = useState(false);

  const books = useSelector((state) => state.books.books);
  const members = useSelector((state) => state.members.members);
  const dispatch = useDispatch();

  useEffect(() => {
    if (books.length === 0) dispatch(fetchBooks());
    if (members.length === 0) dispatch(fetchMembers());
  }, [dispatch, books.length, members.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <div className="container d-flex flex-column align-items-center mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
      <h1 className="text-center" style={{ color: '#6c757d' }}>Register Loan</h1>
      <form onSubmit={handleSubmit} className="w-50">
        <FormSelect 
          label="Book" 
          value={bookId} 
          onChange={(e) => setBookId(e.target.value)} 
          options={books.map((book) => ({ id: book._id, label: `${book.title} (ISBN: ${book.isbn})` }))}
          required
          style={{ marginBottom: '15px' }} // Adjust the space here
        />
        <FormSelect 
          label="Member" 
          value={memberId} 
          onChange={(e) => setMemberId(e.target.value)} 
          options={members.map((member) => ({ id: member._id, label: member.name }))}
          required
          style={{ marginBottom: '15px' }} // Adjust the space here
        />
        <FormInput 
          label="Return Date" 
          value={returnDate} 
          onChange={(e) => setReturnDate(e.target.value)} 
          type="date" 
          required
          style={{ marginBottom: '15px' }} // Adjust the space here
        />
        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}>Register Loan</button>
      </form>
    </div>
  );
};

export default LoanForm;
