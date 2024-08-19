import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook, updateBook } from '../redux/bookSlice';
import BookItem from '../components/BookItem';
import BookEditForm from '../components/BookEditForm';

const BookList = () => {
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteBook(id));
  }, [dispatch]);

  const handleUpdate = useCallback((id, bookData) => {
    dispatch(updateBook({ id, bookData }));
  }, [dispatch]);

  const [editingBook, setEditingBook] = useState(null);

  const startEdit = (book) => {
    setEditingBook(book);
  };

  const saveEdit = (updatedBook) => {
    handleUpdate(editingBook._id, updatedBook);
    setEditingBook(null);
  };

  const cancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f7f9fc', padding: '20px', borderRadius: '10px' }}>
      <h2 className="text-center" style={{ color: '#6c757d' }}>Book List</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {typeof error === 'string' ? error : error.message}</p>}
      {status === 'succeeded' && (
        <div className="row">
          {books.map((book) => (
            <div key={book._id} className="col-md-4 mb-3">
              {editingBook && editingBook._id === book._id ? (
                <BookEditForm
                  book={editingBook}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                />
              ) : (
                <BookItem
                  book={book}
                  onEdit={startEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
