import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../redux/bookSlice'; 
import { useParams } from 'react-router-dom';

const BookEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) =>
    state.books.books.find((book) => book._id === id)
  );
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn);
      setAvailable(book.available);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBook({ id, book: { title, author, isbn, available } }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <input
        type="text"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="ISBN"
        required
      />
      <label>
        Available:
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
        />
      </label>
      <button type="submit">Update Book</button>
    </form>
  );
};

export default BookEdit;
