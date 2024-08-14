import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook, updateBook } from '../redux/bookSlice';

const BookList = () => {
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Dispatching fetchBooks');
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    console.log(`Deleting book with id: ${id}`);
    dispatch(deleteBook(id));
  }, [dispatch]);

  const handleUpdate = useCallback((id, bookData) => {
    console.log(`Updating book with id: ${id}`);
    dispatch(updateBook({ id, bookData }));
  }, [dispatch]);

  const [editingBook, setEditingBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [available, setAvailable] = useState(false);

  const startEdit = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
    setAvailable(book.available);
  };

  const saveEdit = () => {
    handleUpdate(editingBook._id, { title, author, isbn, available });
    setEditingBook(null);
    setTitle('');
    setAuthor('');
    setIsbn('');
    setAvailable(false);
  };

  return (
    <div>
      <h2>Book List</h2>
      {status === 'loading' ? <p>Loading...</p> : null}
      {status === 'failed' ? <p>Error: {error}</p> : null}
      {status === 'succeeded' ? (
        <ul>
          {books && books.map((book) => (
            <li key={book._id}>
              {editingBook && editingBook._id === book._id ? (
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                  />
                  <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="ISBN"
                  />
                  <label>
                    Available:
                    <input
                      type="checkbox"
                      checked={available}
                      onChange={(e) => setAvailable(e.target.checked)}
                    />
                  </label>
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditingBook(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  {book.title} - {book.author} (ISBN: {book.isbn}) - Available: {book.available ? 'Yes' : 'No'}
                  <button onClick={() => startEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default BookList;
