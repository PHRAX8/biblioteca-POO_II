import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/bookSlice'; 

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [available, setAvailable] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook({ title, author, isbn, available }));
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </label>
        <br />
        <label>
          ISBN:
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </label>
        <br />
        <label>
          Available:
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;
