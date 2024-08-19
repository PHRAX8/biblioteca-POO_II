import React from 'react';

const BookItem = ({ book, onEdit, onDelete }) => (
  <div className="p-3" style={{ backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', height: '100%' }}>
    <p><strong>Title:</strong> {book.title}</p>
    <p><strong>Author:</strong> {book.author}</p>
    <p><strong>ISBN:</strong> {book.isbn}</p>
    <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
    <button onClick={() => onEdit(book)} className="btn btn-warning me-2">Edit</button>
    <button onClick={() => onDelete(book._id)} className="btn btn-danger">Delete</button>
  </div>
);

export default BookItem;
